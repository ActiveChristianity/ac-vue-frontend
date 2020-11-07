const path = require('path')
const tailwind = require('tailwindcss')

const postcssPlugins = [
	tailwind(),
]

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/sass/*.scss'),
      ],
    })
}

console.log(`BUILDING ${process.env.GRIDSOME_LOCALE}`)

const plugins = [
  {
    use: '@gridsome/source-graphql',
    options: {
      url: process.env.GRIDSOME_GQL_URL,
      headers: {
        'User-Agent': 'Gridsome/0.7 (Local)',
        'x-lang': process.env.GRIDSOME_LOCALE,
      },
      fieldName: 'ql'
    },
  },
  {
    use: 'gridsome-plugin-flexsearch',
    options: {
      searchFields: ['title', 'name'],
      autoSetup: false,
      collections: [
        {
          indexName: 'Post',
          query: `{ ql { allPosts { title slug type track { id } } } }`,
          path: 'ql.allPosts'
        }
      ],
      flexsearch: {
        cache: true,
        encode: "extra",
        tokenize: "strict",
        threshold: 1,
        resolution: 9,
        depth: 4
      }
    }
  }
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
      {
        use: 'gridsome-plugin-robots-txt',
        options: {
          policy: [{
            userAgent: "*",
            allow: "/",
            disallow: "/editor"
          }]
        }
      },
      {
        use: "gridsome-plugin-manifest",
        options: {
          background_color: "#000000",
          icon_path: 'src/favicon.png',
          name: "ActiveChristianity",
          short_name: "AC",
          theme_color: "#FFAE0C",
          lang: "en",
        },
      },
      {
        use: '@gridsome/plugin-sitemap',
        options: {
          cacheTime: 600000,
          exclude: ['/editor'],
        }
      },
      {
        use: "gridsome-plugin-service-worker",
        options: {
          staleWhileRevalidate: {
            cacheName: "nf-v2",
            fileTypes: [
              "document",
              "audio",
              "font",
              "image",
              "script",
              "style",
            ],
          },
        },
      }
  )
}

const config = {
  siteName: 'ActiveChristianity',
  siteUrl: 'https://activechristianity.org',
  siteDescription: '',

  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        plugins: ['@babel/plugin-proposal-object-rest-spread'],
      }).end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')

    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  },
  plugins,
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins,
      },
    },
  },
}

module.exports = config