<template>
  <div class="center mb-8 py-2 px-4 bg-gray-100">
    <p class="font-serif tracking-wider text-secondary pr-4">Share <span class="hidden md:inline-block">it with someone</span></p>
    <button @click="facebook" class="share-button" title="Share to Facebook" style="background: #1877f2"><icon name="share_facebook" /></button>
    <button @click="twitter" class="share-button" title="Tweet to Twitter" style="background: #1da1f2"><icon name="share_twitter" /></button>
    <button @click="whatsapp" class="share-button" title="Share via WhatsApp" style="background: #03e676"><icon name="share_whatsapp" /></button>
    <button @click="telegram" class="share-button" title="Share via Telegram" style="background: #239fdb"><icon name="share_telegram" /></button>
    <button @click="email" class="share-button" title="Send via Email" style="background: orange"><icon name="share_mail" /></button>
  </div>
</template>

<script>
const getEncodedUrl = () => encodeURIComponent(document.location.href);
const getEncodedTitle = () => encodeURIComponent(document.title);
const createWindow = (width = 500, height = 500) => {
  const left = screen.width / 2 - width / 2;
  const top = screen.height / 2 - height / 2;
  return `width=${width},height=${height},left=${left},top=${top}`;
};

export default {
  name: 'Share',
  data () {
    const width = 500
    const height = 500
    let left = 0
    let top = 0
    if (process.isClient) {
      if (screen.width )
      left = screen.width / 2 - width / 2;
      top = screen.height / 2 - height / 2;
    }

    return {
      windowParams: `width=${width},height=${height},left=${left},top=${top}`
    }
  },
  methods: {
    track (network, action) {
      if (window.ga) {
        ga('send', 'social', network, action, location.pathname)
      }
    },
    email () {
      const url = `mailto:?subject=${getEncodedTitle()}&body=${getEncodedUrl()}`
      window.open(url)
      this.track('Email', 'send')
    },
    facebook () {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${getEncodedUrl()}`
      window.open(url, "Share this", createWindow())
      this.track('Facebook', 'share')
    },
    telegram () {
      const url = `https://telegram.me/share/url?url=${getEncodedUrl()}&text=${getEncodedTitle()}`
      window.open(url)
      this.track('Telegram', 'send')
    },
    twitter () {
      const url = `https://twitter.com/share?url=${getEncodedUrl()}&text=${getEncodedTitle()}`
      window.open(url, "Tweet this", createWindow())
      this.track('Twitter', 'tweet')
    },
    whatsapp () {
      const url = `https://api.whatsapp.com/send?text=${getEncodedUrl()}`
      window.open(url)
      this.track('Whatsapp', 'send')
    }
  }
}
</script>

<style lang="scss">
.share-button {
  @apply mx-2 p-2 text-white rounded bg-secondary leading-none;

  .d4-icon {
    @apply w-5 h-5;
  }
}

@screen md {
  .share-button {
    filter: grayscale(0.9);
    transition: filter 0.3s ease 0s;

    &:focus {
      filter: grayscale(0.5);
    }

    &:hover {
      filter: grayscale(0);
    }
  }
}
</style>
