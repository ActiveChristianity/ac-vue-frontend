<template>
  <main>
    <article class="md:content post my-12">
      <div class="fade-in content-lg md:pt-12">
        <h1 v-html="$m2h(post.title)" class="text-3xl text-center text-blue-900 md:text-4xl font-medium leading-tight"></h1>
        <p class="text-xl my-2">{{ post.sub }}</p>
        <div class="text-center font-detail tracking-wide text-sm text-gray-600 my-6">
          <p class="inline-block border-t border-gray-200 pt-6 px-24">
              <span>{{ (new Date(post.published)).toLocaleDateString() }}</span>
              <b class="mx-1">—</b>
              <span v-if="post.readtime">{{ Math.ceil(post.readtime / 60) }} min read</span>
          </p>
          <p v-if="post.meta.as_ac">
            By ActiveChristianity
          </p>
          <template v-else-if="authorsAs">
            <p v-for="(x, k) in authorsAs" :key="x.key">
              <strong>{{ asStr[k] || 'By' }} </strong>
              <template v-for="(a, i) in x">
                <g-link :key="a.slug" :to="`/${$t.slug_author}/${a.slug}`" :class="{'preAnd': i > 0}">{{ a.name }}</g-link>
              </template>
            </p>
          </template>
        </div>
      </div>
      <g-image class="w-full max-w-screen-md mx-auto md:rounded-2xl" :src="post.image" />
      <div v-if="post.track || postVideo" class="flex items-center justify-center my-2">
        <playable :track="post.track" :video="postVideo" class="text-2xl mr-2"></playable>
        <p class="text-slate" v-if="post.track">{{ Math.round(post.track.duration / 60) }} mins</p>
      </div>
      <div class="post_content py-8 content-md" v-html="post.content"></div>
      <div class="flex flex-wrap content-md">
        <template v-for="topic in post.topics">
          <g-link :key="topic.id" v-if="! topic.group.is_abstract" :to="`${$t.slug_topic}/${topic.slug}`" class="py-2 px-4 mb-2 mr-2 text-center text-sm rounded-full leading-tight font-semibold bg-gray-200 hover:bg-gray-300">{{ topic.name }}</g-link>
        </template>
      </div>
      <div class="py-8 content-md">
        <p class="text-sm text-gray-600" v-html="post.meta.credits"></p>
      </div>
    </article>

    <TopicArticles v-if="topic" :topicSlug="topic.slug"
      :exclude="post.slug"
      :limit="4"
      @empty="topicIndex = topicIndex + 1"
      gridClass="md:content w-full overflow-x-scroll flex items-stretch md:flex-wrap scroll-snap-x p-4">
      <heading :to="`/${$t.slug_topic}/${topic.slug}`">{{topic.name}}</heading>
    </TopicArticles>
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
        src alt srcset dataUri sizes size { width height }
      }
      content
      topics {
        id
        name
        slug
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
    }
  }
}
</page-query>

<script>
import Heading from '~/components/Heading'

export default {
  metaInfo() {
    const seo = this.post.seo || {}
    const meta = [
      { key: 'description', name: 'description', content: seo.desc || this.post.excerpt },
      { key: 'og:title', name: 'og:title', content: seo.title || this.post.title },
      { key: 'og:type', name: 'og:type', content: 'article' },
      { key: 'og:url', name: 'og:url', content: this.post.slug },
    ]
    if (this.post.image) {
      meta.push({ key: 'og:image', name: 'og:image', content: typeof this.post.image == 'object' ? this.post.image.src : this.post.image })
    }
    if (this.post.authors) {
      this.post.authors.forEach(({ name, slug }) => {
        meta.push({ key: slug, name: 'author', content: name })
      })
    }
    return {
      title: seo.title || this.post.title,
      meta
    }
  },
  components: {
    Heading,
    TopicArticles: () => import('~/components/TopicArticles.vue'),
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
      topicIndex: 0
    }
  },
  computed: {
    post() {
      return this.preview || this.$page.ql.post
    },
    topic() {
      if (!this.post.topics || !this.post.topics.length > this.topicIndex) return null
      return this.post.topics[this.topicIndex]
    },
    postVideo() {
      if (! this.post
          || ! this.post.meta
          || ! this.post.meta.url
      ) return false
      return  {
        title: this.post.title,
        url: this.post.meta.url,
        duration: this.post.readtime,
        poster: this.post.image.dataUri,
        isVideo: true,
      }
    },
    authorsAs() {
      if (! this.post.authors) return null
      return this.post.authors.groupBy('pivot.as')
    }
  },
  mounted() {
    setTimeout(() => {
      this.$store.fadeIn = true
    }, 100)
  }
}
</script>
