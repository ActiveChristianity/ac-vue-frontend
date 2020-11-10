<template>
  <div class="relative my-8">
    <div class="fade-in container text-center px-d6">
      <h1 class="text-3xl text-center text-blue-900 md:text-4xl font-medium leading-tight">{{ theForm.title }}</h1>
      <p class="p-8 text-gray-800">{{ theForm.excerpt }}</p>
    </div>
    <div class="content-md my-d6 center">
      <transition name="fade" mode="out-in">
        <div key="loading" v-if="sending" class="py-16">
          <icon name="loader" class="w-1/3 block mx-auto text-secondary rotate-90" />
        </div>
        <div key="msg" v-else-if="msg" class="p-10 text-center">
          <p class="whitespace-pre-line">{{ msg }}</p>
          <button v-if="success" @click="$router.replace('/')" class="block mt-4 p-1 px-4 text-secondary hover:bg-gray-200 center">HOME <icon name="fad-chevron-right" class="ml-1" fa/></button>
          <button v-else @click.prevent="msg = ''" class="border border-gray-200 mt-4 py-2 px-4">OK</button>
        </div>

        <form key="form" v-else class="w-full rounded shadow p-6 bg-gray-100 bg-opacity-50" @submit.stop.prevent="send">
          <input type="text" name="name" v-model="gotcha" placeholder="name" class="hidden">

          <template v-for="field in fields">
            <div v-if="field.layout === 'textarea'" class="input-group" :key="field.key">
              <label :for="field.key">{{ field.attributes.lbl }} {{field.attributes.req ? '*' : ''}}</label>
              <textarea :required="field.attributes.req"
                :id="field.key" :name="field.key" v-model="form[field.key]"
                :placeholder="field.attributes.ph"
                :minlength="field.attributes.min"
                :maxlength="field.attributes.max"
                class="input-field h-48"></textarea>
            </div>
            <div v-else-if="field.layout === 'question'" class="input-group flex mb-6" :key="field.key">
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
            <div class="input-group flex items-start mt-4" :key="term.key">
              <input type="checkbox" class="w-8 h-8 flex-shrink-0" v-model="form[term.key]" :id="term.key" :required="term.attributes.req">
              <label :for="term.key" class="check-label">
                <div class="ml-4"><span>{{ term.attributes.text }}{{term.attributes.req ? '*' : ''}}</span>
                  <a v-if="term.layout === 'file'" class="m-2 rounded px-2 border border-d4secondary inline-block" :href="`${$storage_url}/${term.attributes.file}`" target="_blank">📎 <b class="rp small ml-1 uppercase opacity-75">{{ term.attributes.file.replace(/.*\.(.*)$/, '$1') }}</b></a>
                  <a-link v-else class="mx-2 px-2 py-1 text-secondary hover:bg-gray-200" :to="term.attributes.url"><icon name="fal-external-link-alt" fa /></a-link>
                </div>
              </label>
            </div>
          </template>
          <button class="uppercase mt-8 mb-4 mx-auto block rounded m-1 py-2 px-8 bg-gray-200 hover:text-secondary-alt hover:bg-secondary">{{ theForm.btn }}</button>
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    theForm: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      showTerms: false,
      sending: false,
      success: false,
      msg: this.$t.open_form,
      gotcha: '',
      form: {}
    }
  },
  computed: {
    fields() {
      return this.theForm.fields
    },
    terms() {
      return this.theForm.terms
    },
  },
  methods: {
    async send() {
      if (this.sending || this.gotcha) return

      this.success = false

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
        })
        form.push({
          n: 'uid',
          v: `${country_code}:${ip}`
        })

        const { success, msg, errors } = await this.$api.forms.submit(
          this.theForm.id,
          form
        )
        if (success) {
          this.msg = msg || 'Thank you';
          this.success = true
          this.form = {}
          if (window.dataLayer) {
            window.dataLayer.push ({
              'event' : `${this.theForm.slug}_sent`,
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
  },
  mounted() {
    this.$store.fadeIn = true
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
      @apply bg-white border-secondary shadow-inner;
      outline: none;
    }
    &::placeholder {
      @apply opacity-25;
    }
  }

  select.input-field {
    @apply mt-4 bg-gray-100 text-secondary border-0 font-medium text-base h-10;
  }

  textarea.input-field {
    @apply border border-gray-300 rounded;
    &:focus {
      @apply bg-white border-gray-400 shadow-inner;
      outline: none;
    }
  }
}
</style>
