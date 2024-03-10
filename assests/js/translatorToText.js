// Referenciando os elementos do HTML
const frm = document.getElementById("form")
const button = document.getElementById("btn")

function delSpace(binaryLetters) {
    // Excluir os espaços no valor informado pelo usuario
    let binary = ""
    for (let i = 0; i < binaryLetters.length; i++) {
        if (binaryLetters[i] == " ") {
            continue
        } else if ( !(binaryLetters[i] == 0 || binaryLetters[i] == 1) ) {
            alert("Para converter os números binários em texto, é necessário informar, somente, números entre 0 e 1!")
            binary = 0
            return binary
        } else {
            binary += binaryLetters[i]
        }
    }
    return binary
}

function organize(arrayBinary) {
    // Organizando os números binário - cada índice do array vai ter 8 bits
    let containerBinary = arrayBinary.split('')
    let binary = []
    for (i = 8; i <= containerBinary.length; i += 8) {
        binary.push("")
        for (let j = 8; j > 0; j--) {
            let count = i - j
            binary[binary.length - 1] += containerBinary[count]
        }
    }
    return binary
}

function convertBinaryToDecimal(binarys) {
    // Converte os números binários em decimais
    let decimals = []
    for (let i = 0; i < binarys.length; i++) {
        let decimalBinary = binarys[i].split('')
        let soma = 0
        let sup = 0
            for (let j = decimalBinary.length - 1; j >= 0; j--) {
                let number = Number( decimalBinary[j] )
                soma += (2 ** sup) * number
                sup++
            }
        decimals[i] = soma
    }
    return decimals
}

function convertDecimalToText(decimals) {
    // Converter os números decimais em caractere
    let chars = []
    for (let i = 0; i < decimals.length; i++) {
        chars[i] = String.fromCharCode(decimals[i])
    }
    return chars
}

button.addEventListener('click', (e) => {
    frm.outText.value = `` // Limpa o elemento de saída

    let inBinary = frm.inBinary.value
    let binaryLetters = inBinary.split('')

    let arrayBinary = delSpace(binaryLetters)
    let binarys = organize(arrayBinary)
    let decimals = convertBinaryToDecimal(binarys)
    let chars = convertDecimalToText(decimals)
        // Saída de dados
        for (let i = 0; i < chars.length; i++) {
            frm.outText.value += chars[i]
        }

    e.preventDefault() // Evita envio do form
})