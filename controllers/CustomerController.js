const CustomerService = require('../services/customer.service');
const { body } = require('express-validator');
const customerService = new CustomerService();

exports.validate = (method) => {
    switch (method) {
        case 'createCustomer': {
            return [
                body('name').notEmpty(),
            ];
        }
        case 'updateCustomer': {
            return [
                body('name').notEmpty(),
            ];
        }
    }
};

// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
        const customerData = req.body;
        const customer = await customerService.createCustomer(customerData);
        res.status(201).json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await customerService.getAllCustomers();
        res.json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get a customer by ID
exports.getCustomerById = async (req, res) => {
    const { customerId } = req.params;
    try {
        const customer = await customerService.getCustomerById(customerId);
        res.json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Update a customer by ID
exports.updateCustomer = async (req, res) => {
    const { customerId } = req.params;
    const updatedData = req.body;
    try {
        const customer = await customerService.updateCustomer(customerId, updatedData);
        res.json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
    const { customerId } = req.params;
    try {
        await customerService.deleteCustomer(customerId);
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
