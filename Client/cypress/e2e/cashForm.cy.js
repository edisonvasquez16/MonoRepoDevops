import cashFormPage from '../ui/cashFormPage'
import homePage from '../ui/homePage'
import seeThatValuesCashDetail from '../questions/SeeThatValuesCashDetail'
import menupage from '../ui/menupage'

let cashDataFull

describe('PAYMENTS METHODS TESTS', () =>  {

    beforeEach('PAYMENTS PAGE CAN BE OPEN', () =>  {
        homePage
            .visit()
            .validatePage()
        cy.fixture('cashFormData')
            .then(cashData => {
                cashDataFull = cashData;
            })
        menupage
            .accessToCashMethod()
    })

    describe('TEST OF CREATE CASH PAYMENT', () =>  {

        it('User can save new cash Payment', () =>  {
            const amount = Math.floor(Math.random() * (1000000 - 3000) + 3000)
            const cellphone = '5732' + Math.floor(Math.random() * (99999999 - 11111111) + 11111111)
            cashFormPage
                .enterCashreference(cashDataFull.reference + Math.random().toString(8).slice(2))
                .enterCashuserEmail(cashDataFull.userEmail + Math.floor(Math.random() * 9999) + "@test.com")
                .enterCashcollectorCash(cashDataFull.collectorCash)
                .enterCashAmount(amount)
                .enterCashcellphone(cellphone)
                .saveCashPayment()

            seeThatValuesCashDetail
                .payReference(cashDataFull.reference)
                .userEmail(cashDataFull.userEmail)
                .collectorCash(cashDataFull.collectorCash)
                .amount(amount)
                .cellphone(cellphone)
        })
    })

})