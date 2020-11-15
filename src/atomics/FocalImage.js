// @vue/component
export default {
  functional: true,

  props: {
    src: { type: [Object, String], required: true },
    width: { type: String, default: '' },
    height: { type: String, default: '' },
  },

  render: (h, { data, props }) => {
    const classNames = [data.class, 'g-image']
    const noscriptClassNames = [data.staticClass, classNames.slice()]
    const directives = data.directives || []
    const attrs = data.attrs || {}
    const hook = data.hook || {}
    const res = []

    switch (typeof props.src) {
      case 'string':
        attrs.src = props.src

        break

      case 'object': {
        const { src, srcset, size, dataUri, focal, alt } = props.src

        const sizes = attrs.sizes || props.src.sizes

        const isLazy = !! dataUri
        attrs.src = src
        if (isLazy) {
          attrs.src = dataUri
          attrs['data-src'] = src
          directives.push({ name: 'g-image' })
        }
        attrs.width = size.width
        attrs.alt = alt

        classNames.push(focal ? `object-${focal}` : 'object-center')

        if (srcset && srcset.length) {
          attrs[`${isLazy ? 'data-' : ''}srcset`] = Array.isArray(srcset) ? srcset.join(', ') : srcset
        } else {
          attrs[`${isLazy ? 'data-' : ''}srcset`] = src + ' 600w'
        }

        attrs[`${isLazy ? 'data-' : ''}sizes`] = sizes ? sizes : '600vw'

        break
      }
    }

    hook.update = (oldVnode, vnode) => {
      const { attrs: oldAttrs = {}} = oldVnode.data
      const { attrs = {}} = vnode.data

      if (attrs['data-src'] && attrs.src !== oldAttrs.src) {
        // clear srcset and sizes to show the dataUri image
        vnode.elm.srcset = ''
        vnode.elm.sizes = ''
      }
    }

    res.push(h('img', {
      ...data,
      class: classNames,
      directives,
      props,
      attrs,
      hook
    }))

    if (attrs['data-src']) {
      classNames.push('g-image--lazy')
      classNames.push('g-image--loading')
      noscriptClassNames.push('g-image--loaded')

      // must render as innerHTML to make hydration work

      res.push(h('noscript', {
        domProps: {
          innerHTML: `` +
            `<img src="${props.src.src}" class="${noscriptClassNames.join(' ')}"` +
            (attrs.width ? ` width="${attrs.width}"`: '') +
            (attrs.alt ? ` alt="${attrs.alt}"` : '') +
            `>`
        }
      }))
    }

    return res
  }
}

