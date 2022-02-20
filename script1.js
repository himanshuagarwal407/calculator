const calculator = document.querySelector('.calculator')
const key = document.querySelector('.keys')
const display = document.querySelector('.display')


key.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const k = e.target
        const action = k.dataset.action
        const keyContent = k.textContent
        const displayNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        if (!action) {
            if (displayNum === '0') {
                display.textContent = keyContent
                calculator.dataset.previousKeyType = 'number'
            }
            else if (previousKeyType === 'operator') {
                calculator.dataset.previousKeyType = 'secNum'
                display.textContent = keyContent
            }
            else if(previousKeyType === 'secNum'){
                calculator.dataset.previousKeyType = 'secNum'
                display.textContent = display.textContent + keyContent
            } else {
                display.textContent = displayNum + keyContent
                calculator.dataset.previousKeyType = 'number'
            }
            
        }

        if (
            (action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide') &&
            previousKeyType !== 'operator'
        ){
            if (previousKeyType === 'secNum') {
                const firstVal = calculator.dataset.firstValue
                const operator = calculator.dataset.operator
                const secVal = display.textContent

                display.textContent = calculate(parseFloat(firstVal), operator, parseFloat(secVal))

            }
            calculator.dataset.firstValue = display.textContent
            display.textContent = display.textContent + keyContent
            k.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            
            calculator.dataset.operator = action
        }

        if (action === 'decimal') {
            if (!displayNum.includes('.')) {
                if (previousKeyType === 'operator') {
                    display.textContent = '0.'
                } else {
                    display.textContent = display.textContent + '.'
                }
                if(!previousKeyType === 'secNum')
                    calculator.dataset.previousKeyType = 'decimal'
            }
        }

        if (action === 'clear') {
            display.textContent = 0

            calculator.dataset.previousKeyType = 'clear'
        }
        
        if (action === 'calculate') {
            const firstVal = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secVal = display.textContent

            display.textContent = calculate(parseFloat(firstVal), operator, parseFloat(secVal))

            calculator.dataset.previousKeyType = 'equals'
        }

        Array.from(k.parentNode.children).forEach(ky => ky.classList.remove('is-depressed'))
    }
})

const calculate = (n1, op, n2) => {
    let result = ''

    if (op === 'add')
        result = n1 + n2
    else if (op === 'subtract')
        result = n1 - n2
    else if (op === 'multiply')
        result = n1 * n2
    else if (op === 'divide')
        result = n1 / n2

    return result
}