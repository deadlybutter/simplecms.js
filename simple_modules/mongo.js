var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemas = {};

var LanguageSchema = {
  'prefix': String,
  'full_name': String,
  'parent': String,
  'default': Boolean
};
var Language = mongoose.model('Language', LanguageSchema);

var StructureSchema = {
  'url_prefix': String,
  'human_name': String,
  'template': String,
  'styles': Array,
  'scripts': Array,
  'custom_router': String,
  'variables': Array
};
var Structure = mongoose.model('Structure', StructureSchema);

var ContentSchema = {
  'title': String,
  'url': String,
  'variables': Array,
};
var Content = mongoose.model('Content', ContentSchema);

var types = {
  "language": Language,
  "structure": Structure,
  "content": Content
};

function mongoCallback(err, obj, callback) {
  if (err) {
    console.error(err);
  }
  callback(obj);
}

function saveObj(model, callback) {
  model.save(function(err) {
    mongoCallback(err, model, callback);
  });
}

function newObj(type, data, save, callback) {
  var model = types[type];

  if (!model) {
    callback();
  }

  var obj = new model(data);

  if (!save) {
    callback(obj);
    return;
  }

  saveObj(obj, callback);
}

function getObj(type, one, query, callback) {
  var model = types[type];

  if (!model) {
    callback();
    return;
  }

  if (one) {
    model.where(query).findOne(function(err, obj) {
      mongoCallback(err, obj, callback);
    });
  }
  else {
    model.where(query).find(function(err, obj) {
      mongoCallback(err, obj, callback);
    });
  }
}

// function parseScehma(type, schema) {
//   schemas[type] = {};
//   Object.keys(schema).forEach(function(element) {
//     var item = "";
//     switch(schema[element]) {
//       case String: item = "string"; break;
//       case Array: item = "array"; break;
//     }
//     schemas[type][element] = item;
//   });
// }
//
// function getParsableSchema(type) {
//   return schemas[type];
// }

module.exports = function(ready) {

  var module = {};

  module.getTypes = function() {
    return types;
  }

  module.new = newObj;
  module.save = saveObj;
  module.get = getObj;
  // module.getSchema = getParsableSchema;

  // newObj("language",{
  //   'prefix': "en",
  //   'full_name': "English",
  //   'parent': "",
  //   'default': true
  // }, true, function(lang) {
  //   console.log(lang);
  // });
  // getObj('language', false, {default: true}, function(lang) {
  //   console.log(lang);
  // });

  mongoose.connect(process.env.MONGODB_URI);
  mongoose.connection.once('open', function() {
    ready(module);
  });
}
