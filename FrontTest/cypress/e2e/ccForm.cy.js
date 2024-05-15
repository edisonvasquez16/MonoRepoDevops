import ccFormPage from '../ui/ccFormPage'
import homePage from '../ui/homePage'
import seeThatValuesCCDetail from '../questions/SeeThatValuesCCDetail'
import menupage from '../ui/menupage'

let ccDataFull
const add = Math.floor(Math.random() * 999)

describe('PAYMENTS METHODS TESTS', () => {

    beforeEach('PAYMENTS PAGE CAN BE OPEN', () => {
        homePage
            .visit()
            .validatePage()
        cy.fixture('CCFormData')
            .then(ccData => {
                ccDataFull = ccData;
            })
        menupage
            .accessToCCMethod()
    })

    describe('TEST OF CREATE CC PAYMENT', () => {

        it('User can save new CC Payment', () => {
            const amount = Math.floor(Math.random() * (1000000 - 3000) + 3000)
            const cellphone = '5732' + Math.floor(Math.random() * (99999999 - 11111111) + 11111111)
            ccFormPage
                .enterCCReference(ccDataFull.reference + Math.random().toString(8).slice(2))
                .enterCCName(ccDataFull.ccName + add)
                .enterCCNumber(ccDataFull.ccNumber)
                .selectCCLevel(ccDataFull.level)
                .enterCCYearExp(Math.floor(Math.random() * (50 - 23) + 23))
                .enterCCMonthExp(Math.floor(Math.random() * (12 - 1) + 1))
                .enterCCDues(Math.random() * (48 - 1) + 1)
                .enterCCSecurityCode(add)
                .enterCCUserEmail(ccDataFull.userEmail + add + "@test.com")
                .enterCCAmount(amount)
                .enterCCCellphone(cellphone)
                .saveCCPayment()

            seeThatValuesCCDetail
                .payReference(ccDataFull.reference)
                .userEmail(ccDataFull.userEmail)
                .ccName(ccDataFull.ccName + add)
                .level(ccDataFull.level)
                .amount(amount)
                .cellphone(cellphone)
        })
    })
})