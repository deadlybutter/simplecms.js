var db = {};

var languages = {};

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

module.exports = function(databaseModule, ready) {
  var module = {};

  module.getLanguage = getLanguage;
  module.getLanguages = getLanguages;

  db = databaseModule;
  db.get('language', false, {}, function(langs) {
    languages = langs;
    ready(module);
  });
}
