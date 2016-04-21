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

function mongoCallback(err, callback) {
  if (err) {
    console.error(err);
  }
  callback();
}

// var Cat = mongoose.model('Cat', { name: String });
//
// var kitty = new Cat({ name: 'Zildjian' });
// kitty.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('meow');
//   }
// });

module.exports = function() {

  var module = {};

  mongoose.connect(process.env.MONGODB_URI);



}
