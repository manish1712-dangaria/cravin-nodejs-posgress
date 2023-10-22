const express = require('express');
const router = express.Router();
const ClubController = require('../controllers/ClubController');
const verifyAdminToken = require("../middleware/adminAuth");

router.use(
    verifyAdminToken
);
// Create a new club
router.post('/', ClubController.validate('createClub'), ClubController.createClub);

// Get all clubs
router.get('/', ClubController.getAllClubs);

// Get a specific club by ID
router.get('/:id', ClubController.getClubById);

// Update a club by ID
router.put('/:id', ClubController.validate('updateClub'), ClubController.updateClub);

// Delete a club by ID
router.delete('/:id', ClubController.deleteClub);

module.exports = router;
