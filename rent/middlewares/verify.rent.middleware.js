const CommonValidationMiddleware = require('../../common/middlewares/common.validation.middleware');

exports.isBookIdValid = (req, res, next) => {
    const bookId = req.query.bookId;

    if (CommonValidationMiddleware.isHexString(bookId)) {
        return next();
    } else {
        return res.status(400).send({ error: 'Invalid book id' });
    }
};

exports.isUserIdValid = (req, res, next) => { // АЛИКАНУ ЛОБАВИТЬ К СЕБЕ ДЛЯ userID
    const userId = req.params.userId;

    if (CommonValidationMiddleware.isHexString(userId)) {
        return next();
    } else {
        return res.status(400).send({ error: 'Invalid user id' });
    }
};