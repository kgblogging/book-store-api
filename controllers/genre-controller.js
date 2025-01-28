const Genre = require('../models/genre')

const getGenreList = async (req, res, next) => {
    try {
        const allGenre = await Genre.find({ genreStatus: 1 });

        const totalGenre = await Genre.countDocuments(allGenre);

        const dropdownGenre = allGenre.map(genre => ({
            _id: genre._id,
            value: genre.title,
        }));

        res.status(200).json({
            status: true,
            data: dropdownGenre,
            count: totalGenre,
        });
    } catch (error) {
        next(error);
    }
}
const addGenre = async (req, res, next) => {
    try {
        const { title, genreDescription, genreStatus } = req.body;

        // Check if the genre already exists (case-insensitive)
        const existingGenre = await Genre.findOne({
            title: { $regex: `^${title}$`, $options: 'i' } // Case-insensitive match
        });

        if (existingGenre) {
            return res.status(400).json({
                status: false,
                message: 'Genre already exists. Please use a different title.'
            });
        }

        // Create the genre if it doesn't exist
        const genreData = { title, genreDescription, genreStatus };
        const createdGenre = await Genre.create(genreData);

        if (createdGenre) {
            res.status(201).json({
                status: true,
                message: 'Genre added successfully',
                data: createdGenre
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { getGenreList, addGenre }