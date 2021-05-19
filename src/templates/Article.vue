<template>
  <main class="bg-gradient-to-t md:p-2 mmd:pt-d30" :style="`--gradient-color-stops: ${gradient}`">
    <g-image class="md:hidden w-full h-d30 object-cover object-center top-0 fixed transition-all duration-100" :style="{transform: `translateY(${$store.headerTop+65}px)`}" :src="post.image" :alt="post.title"/>
    <article class="md:content post mt-12 md:my-12 bg-white text-black rounded-t-3xl md:rounded-2xl relative z-10 mmd:border-b-4 mmd:border-slate-lighter">
      <div class="fade-in content-md pt-8 md:pt-12">
        <h1 v-html="$m2h(post.title)" class="text-2xl sm:text-3xl text-center text-blue-900 md:text-4xl font-medium leading-tight"></h1>
        <p class="text-center md:text-xl my-2">{{ post.sub || post.excerpt }}</p>

        <div class="center">
          <div class="flex items-center justify-center mx-auto my-6 border-t border-gray-200 pt-6 w-full md:w-auto md:px-24">
            <bookmark class="rounded w-8 h-8 focus:bg-gray-200 focus:text-blue-600 hover:bg-gray-200 hover:text-blue-600 mr-4" type="post" :id="post.id" :slug="post.slug"></bookmark>

            <div class="text-center font-detail tracking-wide text-sm text-gray-600">
              <p class="inline-block">
                  <span>{{ (new Date(post.published)).toLocaleDateString() }}</span>
                  <b class="mx-1">—</b>
                  <span v-if="post.readtime">{{ Math.ceil(post.readtime / 60) }} {{ $t.mins }}</span>
              </p>

              <p v-if="post.meta.as_ac">
                {{ $t.by }} {{ $t.site_title}}
              </p>
              <template v-else-if="authorsAs">
                <p v-for="(x, k) in authorsAs" :key="x.key">
                  <strong>{{ asStr[k] || 'By' }} </strong>
                  <template v-for="(a, i) in x">
                    <g-link :key="a.slug" :to="`/${$t.slug_ac_author}/${a.slug}`" :class="{'preAnd': i > 0}">{{ a.name }}</g-link>
                  </template>
                </p>
              </template>
            </div>

            <button class="rounded w-8 h-8 focus:bg-gray-200 focus:text-blue-600 hover:bg-gray-200 hover:text-blue-600 ml-4"
               @click="scrollToShare"
               aria-label="share"
            ><icon prefix="fal" name="share" fa/></button>
          </div>
        </div>
      </div>

      <div class="mmd:hidden py-4 md:rounded-2xl">
        <g-image class="w-full max-w-screen-md mx-auto md:rounded-2xl" :src="post.image" :alt="post.title"/>
      </div>

      <div v-if="post.track || postVideo" class="flex items-center justify-center my-2">
        <playable :track="post.track" :video="postVideo" class="text-2xl mr-2"></playable>
        <p class="text-slate" v-if="post.track">{{ Math.round(post.track.duration / 60) }} {{ $t.min }}</p>
      </div>

      <div class="post_content content-md my-4 md:my-8" v-html="content"></div>

      <div v-if="nonAbstractTopics.length" class="content-md my-4 md:my-6">
        <span class="block uppercase font-normal text-slate-light text-sm tracking-wider pb-2">{{ $t.categories }}</span>
        <div class="flex flex-wrap">
          <template v-for="topic in nonAbstractTopics">
            <g-link :key="topic.id" :to="`/${$t.slug_topic}/${topic.slug}`"
                    class="py-2 px-4 mb-2 mr-2 text-center text-sm rounded leading-tight bg-gray-200 hover:bg-gray-300 focus:bg-gray-300"
            >{{ topic.name }}</g-link>
          </template>
        </div>
      </div>

      <div v-if="translations" class="content-md my-4 md:my-6">
        <span class="block uppercase font-normal text-slate-light text-sm tracking-wider pb-2">{{ $t.post_available }}</span>
        <div class="flex flex-wrap text-sm font-sans">
          <template v-for="translation in translations">
            <a-link :key="translation.locale" :path="translation.url" class="w-1/2 sm:w-1/3 md:w-1/4 pb-2 focus:text-secondary hover:text-secondary">{{ translation.title }}</a-link>
          </template>
        </div>
      </div>

      <div v-if="credits" class="content-md my-4 md:my-6">
        <p class="text-sm font-sans" v-html="credits"></p>
      </div>

      <ClientOnly>
        <share />
      </ClientOnly>
    </article>

    <ClientOnly>
      <topic-articles v-if="topic"
        class="relative z-10"
        :title="topic.name"
        :topicSlug="topic.slug"
        :exclude="post.slug"
        :limit="4"
        @empty="topicIndex = topicIndex + 1"
      />
    </ClientOnly>
  </main>
</template>

<page-query>
query Post ($id: ID!) {
  ql {
    post(id: $id) {
      id
      title
      type
      slug
      sub
      excerpt
      readtime
      track {
        title
        url
        duration
      }
      published
      authors {
        name
        slug
        pivot {
          as
        }
      }
      image {
        src alt srcset dataUri sizes size { width height } colors
      }
      content
      topics {
        id
        name
        slug
        noOfPosts
        group {
          is_abstract
        }
      }
      seo {
        title
        desc
      }
      meta {
        url
        no_dict
        as_ac
        ebook_id
        credits
      }
      langs {
        lang
        slug
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    const post = this.post
    if (! post) {
      throw 'Post not found: ' + JSON.stringify(this.$context)
    }
    const seo = post.seo ?? {}
    const url = `${process.env.GRIDSOME_SITE_URL}/${post.slug}`
    const link = [
      { rel: 'canonical', href: url }
    ]
    const meta = [
      { key: 'description', name: 'description', content: seo.desc || post.excerpt },
      { key: 'og:title', name: 'og:title', content: seo.title || post.title },
      { key: 'article:published_time', name: 'article:published_time', content: post.published },
      { key: 'og:type', name: 'og:type', content: 'article' },
      { key: 'og:url', name: 'og:url', content: url },
    ]
    if (post.image) {
      meta.push({ key: 'og:image', name: 'og:image', content: post.image?.src || post.image })
    }
    if (post.authors) {
      post.authors.forEach(({ name, slug }) => {
        meta.push({ key: slug, name: 'author', content: name })
      })
    }
    return {
      title: seo.title || post.title,
      meta,
      link,
    }
  },
  data () {
    return {
      asStr: {
        ar: 'Featuring',
        co: 'Contributed',
        gu: 'Guest',
        ho: 'Hosted by',
        ly: 'Lyrics by',
        me: 'Melody by',
        pr: 'Produced by',
        sp: 'Speaker',
        vo: 'Sung by',
        wr: 'Written by',
      },
      topicIndex: 0,
      glossary: null,
      showShare: false
    }
  },
  computed: {
    post () {
      return this.preview || this.$page.ql?.post
    },
    nonAbstractTopics () {
      return this.topicsWithPosts.filter(t => ! t.group.is_abstract)
    },
    topicsWithPosts () {
      const topics = this.post.topics?.filter(t => t.noOfPosts > 1) || []
      topics.sort((a,b) => a.noOfPosts > b.noOfPosts ? -1 : 1)
      topics.sort((a,b) => ! a.group.is_abstract && b.group.is_abstract ? -1 : 1)
      return topics
    },
    topic () {
      if (process.isClient && this.topicsWithPosts?.length > this.topicIndex) {
        return this.topicsWithPosts[this.topicIndex]
      }
    },
    content () {
      const { content, meta: { no_dict } } = this.post
      if (no_dict || ! this.glossary) {
        return content
      }
      let html = content
      this.glossary.forEach(def => {
        const regx = new RegExp(`(\\s|^)(${def.word}s?)(\\s|,|\\.)`, 'i')
        html = html.replace(regx, `$1<a href="/${this.$t.slug_glossary}/${def.slug}">$2</a>$3`)
      })
      return html
    },
    credits () {
      return this.post?.meta?.credits || '</p>'
    },
    postVideo () {
      return this.post?.meta?.url ? {
        title: this.post.title,
        url: this.post.meta.url,
        duration: this.post.readtime,
        poster: this.post.image.dataUri,
        isVideo: true,
      } : false
    },
    authorsAs () {
      if (! this.post.authors) return null
      return this.post.authors.groupBy('pivot.as')
    },
    translations () {
      const links = []
      let site;
      this.post.langs.forEach(({ lang, slug}) => {
        if ((site = this.$store.sites[lang]) && lang !== this.$store.locale) {
          links.push({
            locale: lang,
            title: site.lang,
            url: [site.url, slug].join('/')
          })
        }
      })
      return links
    },
    gradient () {
      return this.post?.image.colors.map((c, i) => `rgba(${c}, 0.${i}5)`).join(', ')
    }
  },
  methods: {
    scrollToShare () {
      document.getElementById('share-this')?.scrollIntoView({block: 'center', behavior: 'smooth'});
    }
  },
  mounted () {
    this.$store.fadeIn = false
    setTimeout(() => {
      this.$store.fadeIn = true
      if (process.isClient) {
        this.$fetch('/' + this.$t.slug_glossary).then(({data}) => {
          this.glossary = data.ql.glossary
        })
      }
    }, 100)
  },
}
</script>
