import cashDetailPage from "../ui/cashDetailPage"

class SeeThatValueCashDetail {

    payReference(reference) {
        cashDetailPage.elements.reference()
            .invoke('val')
            .should('contain', reference)
        return this
    }

    userEmail(userEmail) {
        cashDetailPage.elements.userEmail()
            .invoke('val')
            .should('contain', userEmail)
        return this
    }

    collectorCash(collectorCash) {
        cashDetailPage.elements.collectorCash()
            .invoke('val')
            .should('contain', collectorCash)
        return this
    }

    amount(amount) {
        console.log('AMOUNT: = ' + amount)
        cashDetailPage.elements.amount()
            .invoke('val')
            .should('contain', amount)
        return this
    }

    cellphone(cellphone) {
        cashDetailPage.elements.cellphone()
            .invoke('val')
            .should('contain', cellphone)
        return this
    }
}

module.exports = new SeeThatValueCashDetail()