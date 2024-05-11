class PseDetailPage {

    elements = {
        user: () => cy.get("input#pseDetailFullNameUser"),
        reference: () => cy.get("input#pseDetailPayReference"),
        referencePse: () => cy.get("input#pseDetailPayReferencePse"),
        userEmail: () => cy.get("input#pseDetailUserEmail"),
        amount: () => cy.get("input#pseDetailAmount"),
        cellphone: () => cy.get("input#pseDetailCellphone"),
    }
}

module.exports = new PseDetailPage();