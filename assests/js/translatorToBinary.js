// Referenciando os elementos do HTML
const frm = document.getElementById("form")
const button = document.getElementById("btn")

function valueDecimal(sentChar) {
    // Converter os caracteres em decimais
    let valueDecimal = sentChar.charCodeAt(0) // Método que converte caracter em binário
    return valueDecimal
}

function convertDecimalToBinary(charDecimal) {
    // Transformar o valor decimal em binário
    let binary = []
    for (let i = 0; charDecimal != 0; i++){
        let rest = charDecimal % 2
        binary[i] = rest
        charDecimal = (charDecimal - rest) / 2
    }
    return binary
}

function addZero(arrayBinary) {
    // Garantir que a representação binária tenha sempre 8 bits
    if (arrayBinary.length < 8) {
        while (arrayBinary.length < 8) {
            arrayBinary[arrayBinary.length] = 0
        }
    }
    return arrayBinary
}

function showUser(showArray) {
    // Reverter a ordem dos bits na representação binária
    let arrayBinaryOrder = []
    for (let i = showArray.length - 1; i >= 0; i--) {
        arrayBinaryOrder[7 - i] = showArray[i]
    }
    return arrayBinaryOrder
}

button.addEventListener('click', (e) => {
    frm.outBinary.value = `` // Limpa o elemento de saída

    let inText = frm.inText.value
    let letters = inText.split('') // Caracteres do texto em array

    for (let i = 0; i < letters.length; i++) {
        let sentChar = letters[i]
        const charDecimal = valueDecimal(sentChar)
        let charBinary = convertDecimalToBinary(charDecimal)
        charBinary = addZero(charBinary)
        charBinary = showUser(charBinary)
            // Saída de dados
            for (let i = 0; i < charBinary.length; i++) {
                frm.outBinary.value += charBinary[i]
            }
            
        frm.outBinary.value += ` `
    }

    e.preventDefault() //Evita envio do form
})