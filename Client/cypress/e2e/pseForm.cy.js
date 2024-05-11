import pseFormPage from '../ui/pseFormPage'
import homePage from '../ui/homePage'
import seeThatValuesPseDetail from '../questions/SeeThatValuesPseDetail'
import menupage from '../ui/menupage'

let pseDataFull

describe('PAYMENTS METHODS TESTS', () => {

    beforeEach('PAYMENTS PAGE CAN BE OPEN', () => {
        homePage
            .visit()
            .validatePage()
        cy.fixture('pseFormData')
            .then(pseData => {
                pseDataFull = pseData;
            })
        menupage
            .accessToPSEMethod()
    })

    describe('TEST OF CREATE PSE PAYMENT', () => {
        const amount = Math.floor(Math.random() * (1000000 - 3000) + 3000)
        const cellphone = '5732' + Math.floor(Math.random() * (99999999 - 11111111) + 11111111)
        it('User can save new PSE Payment', () => {
            pseFormPage
                .enterPsereference(pseDataFull.reference + Math.random().toString(8).slice(2))
                .enterPsereferencePse(pseDataFull.referencePse + Math.random().toString(8).slice(2))
                .enterPseuserEmail(pseDataFull.userEmail + Math.floor(Math.random() * 9999) + "@test.com")
                .enterPsefullNameUser(pseDataFull.fullNameUser)
                .enterPsecellphone(cellphone)
                .enterPseAmount(amount)
                .savePsePayment()

            seeThatValuesPseDetail
                .payUser(pseDataFull.fullNameUser)
                .payReference(pseDataFull.reference)
                .payReferencePse(pseDataFull.referencePse)
                .userEmail(pseDataFull.userEmail)
                .amount(amount)
                .cellphone(cellphone)
        })
    })
})