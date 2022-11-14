<template>
    <div class="text-center">
        <form v-if="!success" @submit.prevent="onSubmit" class="center flex-wrap">
            <label for="email" class="block text-xl my-3 flex-shrink-0 w-full sm:w-1/3">{{ $t.subscriber_newsletter }}</label>
            <input type="email" name="email" id="email" v-model="email"
            class="block flex-1 my-3 p-4 rounded-md border-gray-300 text-black shadow-sm focus:border-prime focus:ring-prime sm:text-sm"
            :placeholder="`${$t.email} (you@example.com)`"
                />
            <input :disabled="!email" type="submit" :value="$t.subscribe"
                class="mx-4 w-auto py-3 px-8 border-2 cursor-pointer outline-none border-transparent rounded-md shadow-sm text-sm font-bold bg-secondary-alt text-secondary
                hover:bg-secondary hover:text-secondary-alt hover:border-secondary-alt
                focus:border-secondary-alt"
                :class="{'opacity-50 pointer-events-none': !email}"
            />
        </form>
        <div v-else class="text-green-600 bg-green-100 py-1 px-3 rounded inline-block text-lg">{{ success }}</div>
        <div v-if="error" class="text-red-600 bg-red-100 py-1 px-3 rounded inline-block text-sm mt-4">{{ error }}</div>
    </div>
</template>
  
<script>
  export default {
    name: 'Subscribe',
    data() {
        return {
            email: '',
            error: '',
            success: '',
        }
    },
    methods: {
        onSubmit() {
            if (this.email) {
                return this.$api.fetch(`mutation Newsletter($email: String!) { subscribe(input: { email: $email }) { success message } }`, {
                    email: this.email
                }).then(res => {
                    const { success, message } = res.subscribe
                    if (success) {
                        this.success = message
                        this.error = ''
                    } else {
                        this.error = message
                        this.success = ''
                    }
                });
            }
        }
    }
}
</script>