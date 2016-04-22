var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LanguageSchema = {
  'prefix': String,
  'full_name': String,
  'parent': String,
  'default': Boolean
};
var Language = mongoose.model('Language', LanguageSchema);

var StructureSchema = {
  'prefix': String,
  'human_name': String,
  'starter_fields': Array,
  'styles': Array,
  'scripts': Array,
  'custom_router': String
};
var Structure = mongoose.model('Structure', StructureSchema);

var FieldTypeSchema = {
  'machine_name': String,
  'human_name': String,
  'description': String,
  'styles': Array,
  'scripts': Array,
};
var FieldType = mongoose.model('FieldType', FieldTypeSchema);

var FieldSchema = {
  'type': String,
  'parent': String,
  'language': String,
  'data': Schema.Types.Mixed
};
var Field = mongoose.model('Field', FieldTypeSchema);

var ContentSchema = {
  'title': String,
  'url': String,
  'fields': Array,
};
var Content = mongoose.model('Content', ContentSchema);

var types = {
  "language": Language,
  "structure": Structure,
  "fieldType": FieldType,
  "field": Field,
  "content": Content
};

var schemas = {
  "language": LanguageSchema,
  "structure": StructureSchema,
  "fieldType": FieldTypeSchema,
  "field": FieldSchema,
  "content": ContentSchema
}

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

function getParsableSchema(type) {
  // make new blank OBJ
  // for each thing in actual
  // check if instance of X function
  // add to new blank OBJ with string as value instead of function
  // return new OBJ
  return schemas[type];
}

module.exports = function(ready) {

  var module = {};

  module.getTypes = function() {
    return types;
  }

  module.new = newObj;
  module.save = saveObj;
  module.get = getObj;
  module.getSchema = getSchema;

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
