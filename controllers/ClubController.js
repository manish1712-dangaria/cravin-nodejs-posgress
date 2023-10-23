const ClubService = require('../services/club.service');
const { body } = require('express-validator');
const clubService = new ClubService();

exports.validate = (method) => {
    switch (method) {
        case 'createClub': {
            return [
                body('club_name').notEmpty(),
            ];
        }
        case 'updateClub': {
            return [
                body('club_name').notEmpty(),
            ];
        }
    }
};

// Create a new club
exports.createClub = async (req, res) => {
    try {
        const clubData = req.body;
        const club = await clubService.createClub(clubData);
        res.status(201).json(club);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get all clubs
exports.getAllClubs = async (req, res) => {
    try {
        const clubs = await clubService.getAllClubs();
        res.json(clubs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get a club by ID
exports.getClubById = async (req, res) => {
    const { id } = req.params;
    try {
        const club = await clubService.getClubById(id);
        res.json(club);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Update a club by ID
exports.updateClub = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const club = await clubService.updateClub(id, updatedData);
        res.json(club);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Delete a club by ID
exports.deleteClub = async (req, res) => {
    const { id } = req.params;
    try {
        await clubService.deleteClub(id);
        res.json({ message: 'Club deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
