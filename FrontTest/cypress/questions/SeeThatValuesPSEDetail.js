import pseDetailPage from "../ui/pseDetailPage"

class SeeThatValuesPseDetail {

    payUser(user) {
        pseDetailPage.elements.user()
            .invoke('val')
            .should('contain', user)
        return this
    }

    payReference(reference) {
        pseDetailPage.elements.reference()
            .invoke('val')
            .should('contain', reference)
        return this
    }

    payReferencePse(referencePse) {
        pseDetailPage.elements.referencePse()
            .invoke('val')
            .should('contain', referencePse)
        return this
    }

    userEmail(userEmail) {
        pseDetailPage.elements.userEmail()
            .invoke('val')
            .should('contain', userEmail)
        return this
    }

    amount(amount) {
        pseDetailPage.elements.amount()
            .invoke('val')
            .should('contain', amount)
        return this
    }

    cellphone(cellphone) {
        pseDetailPage.elements.cellphone()
            .invoke('val')
            .should('contain', cellphone)
        return this
    }
}

module.exports = new SeeThatValuesPseDetail()