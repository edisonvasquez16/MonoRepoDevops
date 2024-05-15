class PseFormPage {

    elements = {
        psereference: () => cy.get("input#psereference"),
        psereferencePse: () => cy.get("input#psereferencePse"),
        pseuserEmail: () => cy.get("input#pseuserEmail"),
        fullNameUser: () => cy.get("input#psefullNameUser"),        
        pseamount: () => cy.get("input#pseamount"),
        psecellphone: () => cy.get("input#psecellphone"),
        savePSEPayment: () => cy.get("button#savePSEPayment")
    }

    enterPsereference(psereference) {
        this.elements.psereference()
            .type(psereference)
        return this
    }

    enterPsereferencePse(psereferencePse) {
        this.elements.psereferencePse()
            .type(psereferencePse)
        return this
    }

    enterPseuserEmail(pseuserEmail) {
        this.elements.pseuserEmail()
            .type(pseuserEmail)
        return this
    }
    
    enterPsefullNameUser(fullNameUser) {
        this.elements.fullNameUser()
            .type(fullNameUser)
        return this
    }
    
    enterPseAmount(pseamount) {
        this.elements.pseamount()
            .type(pseamount)
        return this
    }
    
    enterPsecellphone(psecellphone) {
        this.elements.psecellphone()
            .type(psecellphone)
        return this
    }

    savePsePayment() {
        this.elements.savePSEPayment()
            .click()
    }

}

module.exports = new PseFormPage();