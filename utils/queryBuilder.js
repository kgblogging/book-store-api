// utils/queryBuilder.js
const buildQuery = ({ search, searchFields = [], filters, sort, pageNo, itemsPerPage }) => {
    const page = parseInt(pageNo) || 1;
    const limit = parseInt(itemsPerPage) || 10;
    const skip = (page - 1) * limit;

    // Base query
    let query = {};

    // Add dynamic search conditions
    if (search && searchFields.length > 0) {
        query.$or = searchFields.map(field => ({
            [field]: { $regex: search, $options: 'i' }
        }));
    }

    // Add filters
    if (filters?.length > 0) {
        filters.forEach(filter => {
            const key = Object.keys(filter)[0];
            query[key] = filter[key];
        });
    }

    // Sorting
    let sortQuery = {};
    if (sort?.attributes && sort?.sorts) {
        sort.attributes.forEach((attr, index) => {
            const sortOrder = sort.sorts[index] === 'desc' ? -1 : 1;
            sortQuery[attr] = sortOrder;
        });
    }
    return { query, sortQuery, skip, limit };
};

module.exports = buildQuery;
