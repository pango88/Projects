const moment = require('moment');
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
    default: 'Maintenance'
  },
  due_back: { type: Date, default: Date.now }
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual('url').get(function() {
  return '/catalog/bookinstance/' + this._id;
});

// Virtual for bookinstance's time format
BookInstanceSchema.virtual('due_back_formatted').get(function() {
  return moment(this.due_back).format('MMMM Do, YYYY');
});

// Virtual for bookinstance's time format correct for data
BookInstanceSchema.virtual('due_back_yyyy_mm_dd').get(function() {
  return moment(this.due_back).format('YYYY-MM-DD');
});

//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);
