<template>
  <main class="relative bg-gray-100 p-d6">
    <Icon name="icon-outline" class="absolute bottom-0 right-0 hidden -mb-d4 -mr-d12 w-1/2 max-h-screen text-gray-800 opacity-50 md:block"></Icon>

    <div class="relative">
      <div class="fade-in container text-center px-d6 text-gray-900">
        <h1>{{ $context.title }}</h1>
        <p class="p-8">{{ $context.excerpt }}</p>
      </div>
      <div class="container max-w-screen-md my-d6">
        <transition name="fade" mode="out-in">
          <div key="loading" v-if="sending" class="py-16">
            <Icon name="loader" class="w-1/3 block mx-auto text-white rotate-90" />
          </div>
          <div key="msg" v-else-if="msg" class="p-10 text-center text-gray-900">
              <p class="whitespace-pre-line">{{ msg }}</p>
              <button @click.prevent="msg = ''" class="border border-white mt-4 py-2 px-4">OK</button>
          </div>

          <form key="form" v-else class="w-full bg-white text-black rounded-sm shadow-lg p-6" @submit.stop.prevent="send">
            <input type="text" name="name" v-model="gotcha" placeholder="name" class="hidden">

            <template v-for="field in fields">
              <div v-if="field.layout == 'textarea'" class="input-group" :key="field.key">
                <label :for="field.key">{{ field.attributes.lbl }} {{field.attributes.req ? '*' : ''}}</label>
                <textarea :required="field.attributes.req"
                  :id="field.key" :name="field.key" v-model="form[field.key]"
                  :placeholder="field.attributes.ph"
                  :minlength="field.attributes.min"
                  :maxlength="field.attributes.max"
                  class="input-field h-48"></textarea>
              </div>
              <div v-else-if="field.layout == 'question'" class="input-group flex mb-6" :key="field.key">
                <label :for="field.key">{{ field.attributes.lbl }} {{field.attributes.req ? '*' : ''}}</label>
                <div class="ml-6">
                  <template v-for="(optL, optV) in field.attributes.options">
                    <label :key="optV" :for="optV" class="check-label">
                      <input :type="field.attributes.multi ? 'checkbox' : 'radio'" v-model="form[field.key]" :id="optV" :value="optV">
                      <span class="ml-4">{{ optL }}</span>
                    </label>
                  </template>
                </div>
              </div>
              <div v-else class="input-group" :key="field.key">
                <label :for="field.key">{{ field.attributes.lbl }} {{field.attributes.req ? '*' : ''}}</label>
                <input :type="field.layout" :required="field.attributes.req"
                  :id="field.key" :name="field.key" v-model="form[field.key]"
                  :placeholder="field.attributes.ph"
                  :min="field.attributes.min"
                  :max="field.attributes.max"
                  :minlength="field.attributes.min"
                  :maxlength="field.attributes.max"
                  class="input-field">
              </div>
            </template>
            <template v-for="term in terms">
              <div class="input-group flex items-center mt-4" :key="term.key">
                <input type="checkbox" v-model="form[term.key]" :id="term.key" :required="term.attributes.req">
                <label :for="term.key" class="check-label">
                  <p class="ml-4"><span>{{ term.attributes.text }}{{term.attributes.req ? '*' : ''}}</span>
                    <a v-if="term.layout == 'file'" class="m-2 rounded px-2 border border-d4secondary inline-block" :href="`${$storage_url}/storage/${term.attributes.file}`" target="_blank">📎 <b class="rp small ml-1 text-d4secondary uppercase">{{ term.attributes.file.replace(/.*\.(.*)$/, '$1') }}</b></a>
                    <a v-else class="m-2 px-2 py-1 inline-block" :href="term.attributes.url" target="_blank">🔗</a>
                  </p>
                </label>
              </div>
            </template>
            <button class="btn mt-8 mb-4 mx-auto font-bold block px-12">{{ $context.btn }}</button>
          </form>

        </transition>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  metaInfo() {
    const { title } = this.$context
    return {
      title
    }
  },
  data() {
    return {
      showTerms: false,
      sending: false,
      msg: this.$t.open_form,
      gotcha: '',
      form: {}
    }
  },
  mounted() {
    setTimeout(() => {
      this.$store.fadeIn = true
    }, 50)
  },
  computed: {
    fields() {
      return this.$context.fields
    },
    terms() {
      return this.$context.terms
    },
    origin() {
      return process.isClient ? window.location.origin : ''
    }
  },
  methods: {
    async send() {
      if (this.sending || this.gotcha) return

      let reqFields = this.fields.filter(F => F.attributes.req && !this.form[F.key])
      let reqTerms = this.terms.filter(T => T.attributes.req && !this.form[T.key])
      if (reqFields.length || reqTerms.length) {
        this.msg = this.$t.require_fields
        this.msg += `

${reqFields.map(F => F.attributes.lbl).join(', ')}
${reqTerms.map(T => T.attributes.lbl).join(', ')}
`
        return;
      }

      this.sending = true
      this.msg = this.$t.form_fail

      window.scrollTo(0, 0);
      const { country_code, ip } = await fetch('https://freegeoip.app/json/').then(res => res.json())
      try {
        const form = Object.keys(this.form).map(K => ({
          n: K,
          v: this.form[K]
        }))

        form.push({
          n: 'ts',
          v: new Date().toISOString()
        }, {
          n: 'uid',
          v: `${country_code}:${ip}`
        })

        const { success, msg, errors } = await this.$api.forms.submit(
          this.$context.id,
          form
        )
        if (success) {
          this.msg = msg || 'Thank you';
          this.form = {}
          if (window.dataLayer) {
            window.dataLayer.push ({
              'event' : `${this.form.slug}_sent`,
              'formLocation': 'page'
            })
          }
        } else {
          if (errors) this.msg = errors.join(', ')
        }
      } catch(e) {
        console.error(e)
      }

      this.sending = false
    }
  }
}
</script>

<style lang="scss">
.input-group {
  label {
    @apply mb-1 block;
  }

  .input-field {
    @apply bg-transparent border-b w-full text-lg p-2 mb-8;

    &:focus {
      @apply border-primary shadow-inner;
      outline: none;
    }
    &::placeholder {
      @apply opacity-25;
    }
  }

  select.input-field {
    @apply mt-4 bg-gray-200 text-primary border-0 font-medium text-base h-10;
  }

  textarea.input-field {
    @apply border border-gray-200 rounded;
    &:focus {
      @apply border-gray-400 shadow-inner;
      outline: none;
    }
  }
}
</style>
