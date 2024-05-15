class MenuPage {

    elements = {
        cash: () => cy.get("a#cashOption"),
        pse: () => cy.get("a#pseOption"),
        creditCard: () => cy.get("a#ccOption"),
    }

    accessToCashMethod() {
        this.elements.cash()
            .click()
    }

    accessToPSEMethod() {
        this.elements.pse()
            .click()
    }

    accessToCCMethod() {
        this.elements.creditCard()
            .click()
    }

}

module.exports = new MenuPage();