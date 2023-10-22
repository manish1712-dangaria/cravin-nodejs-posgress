const { Club } = require('../models');

class ClubService {
    async createClub(clubData) {
        try {
            return await Club.create(clubData);
        } catch (error) {
            throw new Error('Failed to create a club.');
        }
    }

    async getAllClubs() {
        try {
            return await Club.findAll();
        } catch (error) {
            throw new Error('Failed to fetch clubs.');
        }
    }

    async getClubById(clubId) {
        try {
            const club = await Club.findByPk(clubId);
            if (!club) {
                throw new Error('Club not found.');
            }
            return club;
        } catch (error) {
            throw new Error('Failed to fetch the club.');
        }
    }

    async updateClub(clubId, updatedData) {
        try {
            const club = await Club.findByPk(clubId);
            if (!club) {
                throw new Error('Club not found.');
            }
            await club.update(updatedData);
            return club;
        } catch (error) {
            throw new Error('Failed to update the club.');
        }
    }

    async deleteClub(clubId) {
        try {
            const club = await Club.findByPk(clubId);
            if (!club) {
                throw new Error('Club not found.');
            }
            await club.destroy();
        } catch (error) {
            throw new Error('Failed to delete the club.');
        }
    }
}

module.exports = ClubService;
