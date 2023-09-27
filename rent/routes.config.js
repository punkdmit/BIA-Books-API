const RentController = require('./controllers/rent.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const RentMiddleware = require('./middlewares/verify.rent.middleware');

const config = require('../common/config/env.config')
const ADMIN = config.permissionLevels.ADMIN;

exports.routesConfig = function (app) {
    
    // Бронирование книги
    app.post('/reserve', [
        ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        RentController.reserve
    ]);

    // Аренда книги
    app.post('/rent', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        RentController.rent
    ]);

    // Отмена бронирования книги
    app.post('/cancelRequest', [
        ValidationMiddleware.validJWTNeeded,
        RentMiddleware.isBookIdValid,
        RentController.cancelRequested
    ]);

    // Возврат книги
    app.post('/cancelRent', [
        ValidationMiddleware.validJWTNeeded,
        RentMiddleware.isBookIdValid,
        RentController.cancelRented
    ]);
};


