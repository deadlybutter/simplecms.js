var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Language = mongoose.model('Language', {
  'prefix': String,
  'full_name': String,
  'parent': String,
  'default': Boolean
});

var Structure = mongoose.model('Structure', {
  'prefix': String,
  'human_name': String,
  'starter_fields': Array,
  'styles': Array,
  'scripts': Array,
  'custom_router': String
});

var FieldType = mongoose.model('FieldType', {
  'machine_name': String,
  'human_name': String,
  'description': String,
  'styles': Array,
  'scripts': Array,
});

var Field = mongoose.model('Field', {
  'type': String,
  'parent': String,
  'language': String,
  'data': Schema.Types.Mixed
});

var Content = mongoose.model('Content', {
  'title': String,
  'url': String,
  'fields': Array,
});

var types = {
  "language": Language,
  "Structure": Structure,
  "FieldType": FieldType,
  "Field": Field,
  "Content": Content
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

module.exports = function() {

  var module = {};

  mongoose.connect(process.env.MONGODB_URI);

  module.getTypes = function() {
    return types;
  }

  module.new = newObj;
  module.save = saveObj;
  module.get = getObj;

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

  return module;
}
