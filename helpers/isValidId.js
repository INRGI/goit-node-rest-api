import { isValidObjectId } from 'mongoose';
import HttpError from './HttpError.js';

const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId) {
        return next(HttpError(404, "Incorect Id"))
    }
    next()
}

export default isValidId;