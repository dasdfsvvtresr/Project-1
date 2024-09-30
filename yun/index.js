class Calculator {
    previousPreview = ''
    currentPreview = ''
    previousOperation = ''
    currentOperation = ''

    constructor(previousPreview, currentPreview) {
        this.previousPreview = previousPreview
        this.currentPreview = currentPreview
    }

    onPressNumber(number) {
        this.currentPreview.textContent += number
    }

    onPressOperation(operation) {
        this.previousPreview.textContent = this.currentPreview.textContent + ' ' + operation
        this.currentPreview.textContent = ''
        this.previousOperation = operation
    }

    onEqual() {
        const operation = this.previousOperation.trim()
        let result = 0

        const prevValue = +this.previousPreview.textContent.split(' ')[0]
        const currentValue = +this.currentPreview.textContent

        if (operation === '+') {
            result = prevValue + currentValue
        } else if (operation === '-') {
            result = prevValue - currentValue
        } else if (operation === '*') {
            result = prevValue * currentValue
        } else if (operation === '÷') {
            result = prevValue / currentValue
        }

        this.previousPreview.textContent = ''
        this.currentPreview.textContent = result.toString()
        this.currentOperation = ''
    }

    onReset() {
        this.previousPreview.textContent = ''
        this.currentPreview.textContent = ''
        this.previousOperation = ''
        this.currentOperation = ''
    }

    onDelete() {
        this.currentPreview.textContent = this.currentPreview.textContent.slice(0, -1)
    }
}

const plus = document.querySelector('[data-btn-plus]')
const minus = document.querySelector('[data-btn-minus]')
const divide = document.querySelector('[data-btn-divide]')
const multiply = document.querySelector('[data-btn-multiply]')
const equal = document.querySelector('[data-btn-equal]')
const reset = document.querySelector('[data-btn-reset]')
const del = document.querySelector('[data-btn-delete]')
const numbers = document.querySelectorAll('[data-btn-number]')
const operations = document.querySelectorAll('[data-btn-operation]')
const previousPreview = document.querySelector('[data-previous-preview]')
const currentPreview = document.querySelector('[data-current-preview]')

const calc = new Calculator(previousPreview, currentPreview)

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        calc.onPressNumber(e.target.textContent)
    })
})

operations.forEach((operation) => {
    operation.addEventListener('click', (e) => {
        if (e.target.textContent.trim() === '=') {
            calc.onEqual()
        } else {
            calc.onPressOperation(e.target.textContent)
        }
    })
})

reset.addEventListener('click', () => {
    calc.onReset()
})

del.addEventListener('click', () => {
    calc.onDelete()
})