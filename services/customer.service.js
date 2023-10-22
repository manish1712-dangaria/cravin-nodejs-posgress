const { Customer } = require('../models');

class CustomerService {
    // Create a new customer
    async createCustomer(customerData) {
        try {
            return await Customer.create(customerData);
        } catch (error) {
            throw new Error('Failed to create a customer.');
        }
    }

    // Get all customers
    async getAllCustomers() {
        try {
            return await Customer.findAll();
        } catch (error) {
            throw new Error('Failed to fetch customers.');
        }
    }

    // Get a customer by ID
    async getCustomerById(customerId) {
        try {
            const customer = await Customer.findByPk(customerId);
            if (!customer) {
                throw new Error('Customer not found.');
            }
            return customer;
        } catch (error) {
            throw new Error('Failed to fetch the customer.');
        }
    }

    // Update a customer by ID
    async updateCustomer(customerId, updatedData) {
        try {
            const customer = await Customer.findByPk(customerId);
            if (!customer) {
                throw new Error('Customer not found.');
            }
            await customer.update(updatedData);
            return customer;
        } catch (error) {
            throw new Error('Failed to update the customer.');
        }
    }

    // Delete a customer by ID
    async deleteCustomer(customerId) {
        try {
            const customer = await Customer.findByPk(customerId);
            if (!customer) {
                throw new Error('Customer not found.');
            }
            await customer.destroy();
        } catch (error) {
            throw new Error('Failed to delete the customer.');
        }
    }
}

module.exports = CustomerService;
