const nextTranslate = require('next-translate')

module.exports = nextTranslate({
  future: {
    webpack5: true,
  },
  react: {
    useSuspense: false,
    wait: true,
  },
})
