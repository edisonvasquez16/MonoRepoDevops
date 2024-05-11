const { model, models } = require("mongoose");

class HomePage {

visit() {
        cy.visit('http://localhost:1338/index');
        return this
    }

    validatePage() {
        cy.contains('Payments')
    }

}

module.exports = new HomePage()