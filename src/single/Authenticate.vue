<template>
  <div class="w-full max-w-xs">
    <form v-if="!loading && !loggedIn" @submit.prevent.stop="signin" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          {{ $t.username }}
        </label>
        <input v-model="username" :class="{'border-red-500': errors.username}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" minlength="6" placeholder="Username">
        <p v-if="errors.username" class="text-red-500 text-xs italic">{{errors.username}}</p>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          {{ $t.password }}
        </label>
        <input v-model="password" :class="{'border-red-500': errors.password}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" minlength="6" type="password" placeholder="******************">
        <p v-if="errors.password" class="text-red-500 text-xs italic">{{errors.password}}</p>
      </div>
      <div class="flex items-center mb-6">
        <label class="md:w-2/3 block text-gray-500 font-bold">
          <input v-model="remember" class="mr-2 leading-tight" type="checkbox">
          <span class="text-sm">{{ $t.remember_me }}</span>
        </label>
      </div>
      <p v-if="error" class="text-red-500 text-xs">{{error}}</p>
      <div class="flex items-center justify-between">
        <input type="submit" value="Sign In" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          {{ $t.reset_password }}
        </a>
      </div>
    </form>
    <div v-else class="bg-white shadow-md rounded px-8 py-24 mb-4 flex items-center justify-center">
      <LoadCheck :loading="loading" />
    </div>
  </div>
</template>

<script>
import LoadCheck from '~/atomics/LoadCheck'
export default {
  data() {
    return {
      loading: true,
      loggedIn: false,
      username: '',
      password: '',
      remember: false,
      errors: {},
      error: false
    }
  },
  components: { LoadCheck },
  methods: {
    signin() {
      const { username, password, remember } = this
      this.errors = {}
      this.error = false
      if (username.length > 6) {
        if (password.length > 6) {
          this.loading = true
          setTimeout(async () => {
            try {
              const user = await this.$api.auth.login(username, password, remember)
              this.onUser(user)
            } catch (e) {
              this.error = Array.isArray(e) ? e.join(' & ') : String(e)
            }
            this.loading = false
          }, 500)
        } else this.errors.password = 'Minimum length should be 6 characters and contain a number'
      } else this.errors.username = 'Please enter a valid email address'
    },
    onUser(user) {
      if (user && user.name) {
        this.loggedIn = user
        setTimeout(() => {
          this.$store.loggedIn = this.loggedIn
        }, 1500)
      }
    }
  },
  async mounted() {
    this.loading = true
    try {
      const user = await this.$api.auth.profile()
      this.onUser(user)
    } catch (e) {
      this.loggedIn = this.$store.loggedIn = false
      console.warn(e)
    }
    this.loading = false
  }
}
</script>
