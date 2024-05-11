import ccDetailPage from "../ui/ccDetailPage"

class SeeThatValueCCDetail {

    payReference(reference) {
        ccDetailPage.elements.reference()
            .invoke('val')
            .should('contain', reference)
        return this
    }

    userEmail(userEmail) {
        ccDetailPage.elements.userEmail()
            .invoke('val')
            .should('contain', userEmail)
        return this
    }

    ccName(ccName) {
        ccDetailPage.elements.ccName()
            .invoke('val')
            .should('contain', ccName)
        return this
    }

    level(level) {
        ccDetailPage.elements.level()
            .invoke('val')
            .should('contain', level)
        return this
    }

    amount(amount) {
        ccDetailPage.elements.amount()
            .invoke('val')
            .should('contain', amount)
        return this
    }

    cellphone(cellphone) {
        ccDetailPage.elements.cellphone()
            .invoke('val')
            .should('contain', cellphone)
        return this
    }
}

module.exports = new SeeThatValueCCDetail()