class CCetailPage {

    elements = {
        reference: () => cy.get("input#ccDetailReference"),
        userEmail: () => cy.get("input#ccDetailUserEmail"),
        ccName: () => cy.get("input#ccDetailCCName"),
        level: () => cy.get("input#ccDetailLevel"),
        amount: () => cy.get("input#ccDetailAmount"),
        cellphone: () => cy.get("input#ccDetailCellphone"),
    }
}

module.exports = new CCetailPage();