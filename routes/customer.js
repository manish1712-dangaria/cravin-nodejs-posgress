const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');
const verifyAdminToken = require("../middleware/adminAuth");


router.use(
    verifyAdminToken
);
// Create a new customer
router.post('/', CustomerController.validate('createCustomer'), CustomerController.createCustomer);

// Get all customers
router.get('/', CustomerController.getAllCustomers);

// Get a specific customer by ID
router.get('/:id', CustomerController.getCustomerById);

// Update a customer by ID
router.put('/:id', CustomerController.validate('updateCustomer'), CustomerController.updateCustomer);

// Delete a customer by ID
router.delete('/:id', CustomerController.deleteCustomer);

module.exports = router;
