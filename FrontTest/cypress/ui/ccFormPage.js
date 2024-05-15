class CashFormPage {

    elements = {
        ccreference: () => cy.get("input#ccreference"),
        ccName: () => cy.get("input#ccName"),
        ccNumber: () => cy.get("input#ccNumber"),
        ccLevel: () => cy.get("select#ccLevel"),
        ccYearExp: () => cy.get("input#ccYearExp"),
        ccMonthExp: () => cy.get("input#ccMonthExp"),
        ccDues: () => cy.get("input#ccDues"),
        ccSecurityCode: () => cy.get("input#ccSecurityCode"),
        ccuserEmail: () => cy.get("input#ccuserEmail"),
        ccamount: () => cy.get("input#ccamount"),
        cccellphone: () => cy.get("input#cccellphone"),
        saveCCPayment: () => cy.get("button#saveCCPayment")
    }

    enterCCReference(ccreference) {
        this.elements.ccreference()
            .type(ccreference)
        return this
    }

    enterCCName(ccName) {
        this.elements.ccName()
            .type(ccName)
        return this
    }

    enterCCNumber(ccNumber) {
        this.elements.ccNumber()
            .type(ccNumber)
        return this
    }

    selectCCLevel(ccLevel) {
        this.elements.ccLevel()
            .select(ccLevel)
        return this
    }

    enterCCYearExp(ccYearExp) {
        this.elements.ccYearExp()
            .type(ccYearExp)
        return this
    }

    enterCCMonthExp(ccMonthExp) {
        this.elements.ccMonthExp()
            .type(ccMonthExp)
        return this
    }

    enterCCDues(ccDues) {
        this.elements.ccDues()
            .type(ccDues)
        return this
    }

    enterCCSecurityCode(ccSecurityCode) {
        this.elements.ccSecurityCode()
            .type(ccSecurityCode)
        return this
    }

    enterCCUserEmail(ccuserEmail) {
        this.elements.ccuserEmail()
            .type(ccuserEmail)
        return this
    }

    enterCCAmount(ccamount) {
        this.elements.ccamount()
            .type(ccamount)
        return this
    }

    enterCCCellphone(cccellphone) {
        this.elements.cccellphone()
            .type(cccellphone)
        return this
    }

    saveCCPayment() {
        this.elements.saveCCPayment()
            .click()
    }

}

module.exports = new CashFormPage();