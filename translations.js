const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const stringify = require(`json-stringify-safe`)

const translations = async function () {
  console.log('Loading AC Translations')
  try {
    const url = process.env.GRIDSOME_BACKEND_URL + '/day4/string_translations'
    const strings = await fetch(url).then(res => res.json())

    const set = {}
    const locale = process.env.GRIDSOME_LOCALE
    const fallback = process.env.GRIDSOME_LOCALE_FALLBACK || 'en'
    if (!locale) throw new Error('Enviroment LOCALE does not seem to be set')

    let key = null
    strings.forEach(string => {
      if (key = string.key) {
        set[key] = string[locale] || string[fallback]
      }
    })

    saveFile('./src/strings', locale, 'json', set)

    console.log(`Done translation loaded`);
    return new Proxy(set, {
      get (target, key, receiver) {
        return target[key]
      },
      set (target, key, value) {
        target[key] = value
        saveFile('./src/strings', locale, 'json', target)
      }
    })
  } catch (e) {
    console.log('Loading Translations error:\n', e)
  }
}

function saveFile(folder, name, extension, data) {
  const filename = path.resolve(`${folder}/${name}.${extension}`)
  try {
    fs.writeFileSync(filename, stringify(data, null, 2))
    console.log(`File saved: ${filename}`)
  } catch(err) {
    console.error(`Could not save the file: ${filename} – make sure directory is writeable`, err)
  }
}

module.exports = translations
