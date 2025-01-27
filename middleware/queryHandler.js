// middleware/queryHandler.js
const buildQuery = require('../utils/queryBuilder');

const queryHandler = (searchFields = []) => (req, res, next) => {
    try {
        const { search, filters, sort, pageNo, itemsPerPage } = req.body;
        const { query, sortQuery, skip, limit } = buildQuery({
            search,
            searchFields,
            filters,
            sort,
            pageNo,
            itemsPerPage,
        });
        // Attach the parsed query details to the request object
        req.queryDetails = { query, sortQuery, skip, limit };
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = queryHandler;
