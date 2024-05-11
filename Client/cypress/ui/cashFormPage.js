class CashFormPage {

    elements = {
        cashreference: () => cy.get("input#cashreference"),
        cashuserEmail: () => cy.get("input#cashuserEmail"),
        cashcollectorCash: () => cy.get("input#cashcollectorCash"),
        cashamount: () => cy.get("input#cashamount"),
        cashcellphone: () => cy.get("input#cashcellphone"),
        saveCashPayment: () => cy.get("button#saveCashPayment")        
    }

    enterCashreference(cashreference) {
        this.elements.cashreference()
            .type(cashreference)
        return this
    }
    
    enterCashuserEmail(cashuserEmail) {
        this.elements.cashuserEmail()
            .type(cashuserEmail)
        return this
    }
    enterCashcollectorCash(cashcollectorCash) {
        this.elements.cashcollectorCash()
            .type(cashcollectorCash)
        return this
    }
    enterCashAmount(cashamount) {
        this.elements.cashamount()
            .type(cashamount)
        return this
    }
    enterCashcellphone(cashcellphone) {
        this.elements.cashcellphone()
            .type(cashcellphone)
        return this
    }

    saveCashPayment() {
        this.elements.saveCashPayment()
            .click()
    }

}

module.exports = new CashFormPage();