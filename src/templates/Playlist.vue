<template>
  <main class="content">
    <div class="fade-in pt-12">
      <div class="pb-8 text-center content-md">
        <g-image v-if="playlist.image" class="w-full max-w-screen-md mx-auto rounded-2xl my-8" :src="playlist.image"></g-image>
        <h1 class="text-3xl text-blue-900 md:text-4xl font-medium leading-tight">{{ playlist.title }}</h1>
        <p>{{ playlist.excerpt }}</p>
      </div>

      <div class="my-4 w-full overflow-x-scroll flex items-stretch md:flex-wrap scroll-snap-x p-4">
        <template v-for="track in tracks">
          <article-cover-card :key="track.id" :article="track"
            class="w-11/12 md:w-1/2 lg:w-1/4"
          />
        </template>
      </div>
    </div>
  </main>
</template>

<page-query>
fragment fImage on ql_Image {
  src alt srcset dataUri sizes size { width height } focal
}
query Playlist ($id: ID!) {
  ql {
    playlist(id: $id) {
      title
      excerpt
      slug
      image {
        ...fImage
      }
      tracks {
        title
        duration
        url
        post {
          id
          type,
          slug,
          readtime,
          image {
            ...fImage
          }
          meta {
            as_ac
          }
          authors {
            name
          }
        }
      }
    }
  }
}
</page-query>

<script>
import ArticleCoverCard from "../components/ArticleCoverCard";
export default {
  components: {ArticleCoverCard},
  computed: {
    playlist() {
      return this.$page.ql.playlist
    },
    tracks() {
      if (this.playlist._tracks) {
        return this.playlist._tracks
      }

      const tracks = []
      // Since most components are made to handle posts instead of tracks we just switch them.
      this.playlist._tracks = this.playlist.tracks.map(track => {
        track.post.track = {
          title: track.title,
          url: track.url,
          duration: track.duration,
          playlist: `/playlists/${this.playlist.slug}`,
          tracks,
        }
        track.post.title = track.title
        tracks.push(track.post.track)
        return track.post
      })

      return this.playlist._tracks
    }
  }
}
</script>