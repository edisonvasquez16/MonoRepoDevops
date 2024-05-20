const urlPage = Cypress.env('BASE_URL') + Cypress.env('CLIENT_PORT') + '/index'
class HomePage {

    visit() {
        cy.visit(urlPage);
        return this
    }

    validatePage() {
        cy.contains('Payment')
        return this
    }

    goToPlatform() {
        cy.get("input[value]").click();
    }

}

module.exports = new HomePage()