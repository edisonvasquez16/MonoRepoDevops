const urlPage = Cypress.env('BASE_URL') + Cypress.env('CLIENT_PORT') + '/index'
class HomePage {

visit() {
        cy.visit(urlPage);
        return this
    }

    validatePage() {
        cy.contains('Payments')
    }

}

module.exports = new HomePage()