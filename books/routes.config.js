const BooksController = require('./controllers/books.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');

const config = require('../common/config/env.config')

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    
    // Добавление книги в БД
    app.post('/books', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        BooksController.insert
    ]);

    // Получение полного списка книг
    app.get('/books', [
        ValidationMiddleware.validJWTNeeded,
        BooksController.list
    ]);

    // Получение детальной информации по книге
    app.get('/books/details', [
        ValidationMiddleware.validJWTNeeded,
        BooksController.bookInfo
    ]);

    // Добавление книги
    app.post('/books', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        BooksController.insert
    ]);

    // Изменение информации по книге
    app.patch('/books/:bookId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        BooksController.edit
    ]);

    // Удаление книги
    app.delete('/books/:bookId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        BooksController.delete
    ]);

    // Список забронированных книг
    app.get('/requestedBooks', [
        ValidationMiddleware.validJWTNeeded,
        BooksController.listRequested
    ]);

    // Список взятых книг
    app.get('/rentedBooks', [
        ValidationMiddleware.validJWTNeeded,
        BooksController.listRented
    ]);

    // Список прочитанных книг
    app.get('/returnedBooks', [
        ValidationMiddleware.validJWTNeeded,
        BooksController.listReturned
    ]);
}; 



