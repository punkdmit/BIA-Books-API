const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const booksSchema = new Schema( { 
    name: String,
    author: String,
    language: String,
    description: String,
    status: Boolean,
    image: String,
    pages: String,
    year: String,
    rate: String,
    tags: [String]
});

booksSchema.virtual('ids').get(function () {
    return this._id.toHexString();
});

const Book = mongoose.model('Book', booksSchema);

exports.create = (bookData) => {
    return new Book(bookData).save();
};

exports.edit = (req) => {
    return Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
};

exports.delete = (id) => {
    return Book.findByIdAndDelete(id);
}

exports.list = (perPage, page, filter) => {
    return Book
            .find(filter, { __v: 0 })
            .limit(perPage)
            .skip(perPage * page);
};

exports.bookInfo = (id) => {
    return Book.findById(id, { __v: 0 });
};