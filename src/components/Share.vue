<template>
  <div class="center mb-8 py-2 px-4 bg-gray-100">
    <p class="font-serif tracking-wider text-secondary pr-4">Share <span class="hidden md:inline-block">it with someone</span></p>
    <facebook-button class="btn-share" btnText title="Share via Facebook" />
    <twitter-button class="btn-share" btnText title="Share via Twitter" />
    <whats-app-button class="btn-share" btnText title="Share via WhatsApp" />
    <telegram-button class="btn-share" btnText title="Share via Telegram" />
    <email-button class="btn-share" btnText title="Share via Email" />
  </div>
</template>

<script>
import EmailButton from "vue-share-buttons/src/components/EmailButton"
import FacebookButton from "vue-share-buttons/src/components/FacebookButton"
import TelegramButton from "vue-share-buttons/src/components/TelegramButton"
import TwitterButton from "vue-share-buttons/src/components/TwitterButton"
import WhatsAppButton from "vue-share-buttons/src/components/WhatsAppButton"

export default {
  components: {
    EmailButton,
    FacebookButton,
    TelegramButton,
    TwitterButton,
    WhatsAppButton,
  },
}
</script>

<style lang="scss">
.share-button.btn-share {
  border: none;
  padding: 8px;
  min-width: auto;
  min-height: auto;
  line-height: 1;
  outline: none;
}

@screen md {
  .share-button.btn-share {
    filter: grayscale(0.9);
    transition: filter 0.3s ease 0s;

    &:hover, &:focus {
      filter: grayscale(0);
    }
  }
}
</style>