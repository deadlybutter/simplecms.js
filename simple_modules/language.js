var languages = require(__dirname + '/../config/languages');

function getLanguage(langCode) {
  if (langCode == undefined) {
    return undefined;
  }

  var language = languages[langCode];

  if (!language) {
    var defaultLang = languages["*"];

    if (defaultLang) {
      return getLanguage(defaultLang.parent)
    }
  }

  return language;
}

function getLanguages() {
  return languages;
}

module.exports = function() {
  var module = {};

  module.getLanguage = getLanguage;
  module.getLanguages = getLanguages;

  return module;
}
