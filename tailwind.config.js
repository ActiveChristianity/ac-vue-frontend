const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: {
    mode: 'layers',
    layers: ['base', 'components', 'utilities'],
    content: [
      "./src/**/*.vue"
    ]
  },
  theme: {
    fontFamily: {
      sans: ['Source Sans Pro', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      serif: ['Merriweather', '-apple-system','BlinkMacSystemFont','serif'],
      mono: ['monospace', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
    },
    extend: {
      screens: {
        // => @media (max-width: Xpx) { ... }
        'msm': {'max': '639px'},
        'mmd': {'max': '767px'},
        'mlg': {'max': '1023px'},
        'mxl': {'max': '1279px'},
      },
      colors: {
        'primary': 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        'secondary': 'var(--secondary)',
        'secondary-alt': 'var(--secondary-alt)',
        'slate-lighter': 'var(--slate-lighter)',
        'slate-light': 'var(--slate-light)',
        'slate': 'var(--slate)',
        'slate-dark': 'var(--slate-dark)',
        'white': 'var(--white)',
        'black': 'var(--black)',
      },
      spacing: {
        7: '1.75rem',
        'd2': '2%',
        'd4': '4%',
        'd6': '6%',
        'd8': '8%',
        'd10': '10%',
        'd12': '12%',
        'd14': '14%',
        'd16': '16%',
        'd18': '18%',
        'd20': '20%',
        'd30': '30%',
        'd46': '46%',
        'rect': '50%',
        '16/9': '56.25%',
        '3:2': '66.66%',
        '4/3': '75%',
        '3/4': '133%',
        'square': '100%',
      },
      boxShadow: {
        outline: '0 1px 0 2px var(--secondary)'
      }
    },
  },
  variants: {},
  plugins: [
    plugin(function({ addUtilities }) {
      const contentUtilities = {
        '.content': {
          '@apply w-11/12 max-w-screen-xl mx-auto': {},
          '.content': {
            '@apply w-full': {},
          }
        },
        '.content-lg': {
          '@apply w-full max-w-screen-lg mx-auto px-8': {},
        },
        '.content-md': {
          '@apply w-full max-w-screen-md mx-auto px-8': {},
        },
      }

      addUtilities(contentUtilities, {
        variants: ['responsive'],
      })
    }),
    plugin(function ({ addUtilities, addComponents }) {
      const newUtilities = {
        '.wide': {
          '@apply relative w-full pb-16/9 bg-center bg-cover': {},
        },

        '.center': {
          '@apply flex items-center justify-center': {},
        },
        '.blur': {
          '@apply inset-0 scale-125': {},
          filter: 'blur(10px)',
        },
        '.scroll-snap-x': {
          'overflow-x': 'scroll',
          '-webkit-scroll-snap-type': 'x mandatory',
          '-ms-scroll-snap-type': 'x mandatory',
          'scroll-snap-type': 'x mandatory',
          '> div': {
            'scroll-snap-align': 'center',
          },
        },
      }

      addUtilities(newUtilities, {
        variants: ['responsive'],
      })

      const comps = {
        '.headbar-center-link': {
          '@apply m-1 py-1 px-2 rounded-sm cursor-pointer border-b-2 border-transparent transition duration-200': {},
          '&:hover': {
            '@apply text-black underline': {},
          },
        },

        '.column-layout': {
          'column-count': 1,
          'column-gap': '1rem',
          '@screen sm': {
            'column-count': 2,
            'column-gap': '1rem',
          },
          '@screen md': {
            'column-count': 3,
            'column-gap': '2rem',
          },
          '@screen lg': {
            'column-count': 3,
            'column-gap': '3rem',
          },
          '@screen xl': {
            'column-count': 4,
            'column-gap': '4rem',
          }
        }
      }

      addComponents(comps)
    }),
    plugin(function({ addUtilities }) {
      const breakUtilities = {
        '.avoid-before': {
          'break-before': 'avoid'
        },
        '.avoid-inside': {
          'break-inside': 'avoid'
        },
        '.avoid-after': {
          'break-after': 'avoid'
        },
      }

      addUtilities(breakUtilities, {
        variants: ['responsive'],
      })
    }),
  ],
  corePlugins: {
    outline: false
  },
}
