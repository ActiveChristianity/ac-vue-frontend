const {google} = require('googleapis');
const fs = require('fs')
const path = require('path')
const stringify = require(`json-stringify-safe`)

module.exports = async function() {
  console.log('Loading AC Translations')
  try {
    const sheets = google.sheets({
      version: 'v4',
      auth: 'AIzaSyASDGn4oZErww-RsW6kBPnQz7tCB6x3Fpk'
    });

    return await sheets.spreadsheets.values.get({
      spreadsheetId: '19ukkR_BS7FVkVwTN63SCYwtZfK-OHqQDQWKJ_FhOJm4',
      range: 'A:Z',
    }, (err, res) => {
      let langs = 0

      if (err) {
        console.error('Could not fetch translations from Google Sheets');
        throw err;
      }

      const rows = res.data.values
      if (rows.length === 0) {
        console.log('No data found.');
      } else {
        const headers = rows[0]
        if (headers[0] !== 'key') throw new Error('Translation file seems mulformed')

        const langsObj = {}
        const langsArr = []
        const slugTranslatedUrl={}
        let localeIndex = -1
        let envLocale = lang_locale[process.env.GRIDSOME_LOCALE]
        if (!envLocale) throw new Error('Enviroment LOCALE does not seem to be set')

        headers.forEach((lang, index) => {
          if (lang && lang !== 'key') {
            console.log(`Found ${lang} language`)
            langs++
            langsObj[lang] = {}
            langsArr[index] = langsObj[lang]
            if (lang === envLocale) {
              localeIndex = index
            }
          }
        })

        rows.forEach(cols => {
          let key = cols[0]

          if (localeIndex > -1) {
            if (!cols[localeIndex]) console.log(`string ${key} is not translated`)

            langsArr[localeIndex][key] = cols[localeIndex] ? cols[localeIndex] : ''
            // langsArr[localeIndex][key] = cols[localeIndex] || defaultValue
          } else langsArr.forEach((obj, index) => {
            if (obj) {
              if (!cols[index]) console.log(`string ${key} is not translated`)
              obj[key] = cols[index] ? cols[index] : ''
              // obj[key] = cols[index] || defaultValue
            }
          })

        })

        if (localeIndex > -1) {
          saveFile('./src/strings', locale_lang[envLocale], 'json', langsObj[envLocale])
        } else for (let locale in langsObj) {
          saveFile('./src/strings', locale_lang[locale], 'json', langsObj[locale])
        }

      }
      console.log(`Done ${langs} translations loaded`);

      return true
    });
  } catch (e) {
    console.log('\Loading Translations error:\n', e.response.data && e.response.data.errors)
  }
}

function saveFile(folder, name, extension, data) {
  const filename = path.resolve(`${folder}/${name}.${extension}`)
  try {
    fs.writeFileSync(filename, stringify(data, null, 2))
  } catch(err) {
    console.error(`AC Translations could not save the file. Please make sure the folder structure is already in place.`, err)
  }

  console.log(`AC Translations: ${filename} – saved`)
}

const lang_locale = {
  "en": "en_US",
  "en_ke": "en_US",
  "es": "es_ES",
  "fr": "fr_FR",
  "fi": "fi",
  "hu": "hu_HU",
  "it": "it_IT",
  "nb": "nb_NO",
  "pl": "pl_PL",
  "pt-pt": "pt_PT",
  "ro": "ro_RO",
  "ru": "ru_RU",
  "sv": "sv_SE",
  "de": "de_DE",
  "nl": "nl_NL",
  "da": "da_DK",
}

const locale_lang={
  "en_US": "en",
  "es_ES": "es",
  "fr_FR": "fr",
  "fi": "fi",
  "hu_HU": "hu",
  "it_IT": "it",
  "nb_NO": "nb",
  "pl_PL": "pl",
  "pt_PT": "pt-pt",
  "ro_RO": "ro",
  "ru_RU": "ru",
  "sv_SE": "sv",
  "de_DE": "de",
  "nl_NL": "nl",
  "da_DK": "da",
}