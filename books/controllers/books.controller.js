const BooksModel = require('../models/books.models');
const RentModel = require('../../rent/models/rent.models');

exports.insert = async (req, res) => {
    try {
        let result = await BooksModel.create(req.body)

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send();
        }

    } catch(err) {
        res.status(500).send({ error: err });
    }
};

exports.edit = async (req, res) => {
    try {
        let result = await BooksModel.edit(req);
        res.status(200).send(result);
    } catch(err) {
        res.status(500).send({ error: err });
    }
};

exports.delete = async (req, res) => {
    try {
        let result = await BooksModel.delete(req.params.bookId);
        
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send();
        }

    } catch(err) {
        res.status(500).send({ error: err });
    }
};

exports.list = async (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;

    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }

    try {
        let result =  await BooksModel.list(limit, page);
        res.status(200).send(result);
    } catch(err) {
        res.status(500).send({ error: err });
    }
};

exports.bookInfo = async (req, res) => {
    try {
        let bookId = req.query.bookId;
        let book = await BooksModel.bookInfo(bookId)

        if (book) {
            let isReserved = await RentModel.checkReserveExists(bookId);
            let expirationDate = await RentModel.checkRentExists(bookId);
            
            book = book.toJSON();
            
            book.isReserved = isReserved;
            book.expirationDate = expirationDate;
            
            res.status(200).send(book);
        } else {
            res.status(404).send();
        }
    } catch(err) {
        res.status(500).send({ error: err });
    }
};

exports.listRequested = async (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;

    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }

    let userId = req.jwt.userId;
    let requestedBooks = await RentModel.getRequestedBooks(userId);
    if (requestedBooks !== null) {
        filter = requestedBooks.toJSON();
        filter._id = filter.requestedBooks;
        delete filter.requestedBooks; 
      }
    // let filter = requestedBooks.toJSON();
    // filter._id = filter.requestedBooks;
    // delete filter.requestedBooks; 
    try {
        let result =  await BooksModel.list(limit, page, filter)     
        res.status(200).send(result);
    } catch(err) {
        res.status(500).send({ error: err });
    }
};

exports.listRented = async (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;

    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }

    let userId = req.jwt.userId;
    let rentedBooks = await RentModel.getRentedBooks(userId);

    let filter = { rentedBooks: [] };
    if (rentedBooks !== null) {
        filter = rentedBooks.toJSON();
        filter._id = filter.rentedBooks.map(element => { return element.bookId });
        delete filter.rentedBooks; 
    }
    try {
        let result =  await BooksModel.list(limit, page, filter);     
        res.status(200).send(result);
    } catch(err) {
        res.status(500).send({ error: err });
    }
};

exports.listReturned = async (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;

    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }

    let userId = req.jwt.userId;
    let returnedBooks = await RentModel.getReturnedBooks(userId);
    let filter = returnedBooks.toJSON();
    filter._id = filter.returnedBooks;
    delete filter.returnedBooks; 
    
    try {
        let result =  await BooksModel.list(limit, page, filter);
        res.status(200).send(result);
    } catch(err) {
        res.status(500).send({ error: err });
    }
};

