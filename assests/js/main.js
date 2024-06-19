function TranslateBinary() {
    this.painelInput = document.querySelector('textarea[translate]');
    this.painelOutput = document.querySelector('textarea[output]');

    this.convertion = () => {
        const typeInputText = document.querySelector('.subTitle span[textInput]');
        const typeOutputText = document. querySelector('.subTitle span[textOutput]');
        
        if (typeInputText.textContent === 'Texto') {
            typeInputText.textContent = 'Binário';
            typeOutputText.textContent = 'Texto';
            this.painelInput.setAttribute('translate', 'binary');
            this.painelOutput.setAttribute('output', 'text');
            this.painelInput.placeholder = 'Informe um número binário para traduzir:';
        } else {
            typeInputText.textContent = 'Texto';
            typeOutputText.textContent = 'Binário';
            this.painelInput.setAttribute('translate', 'text');
            this.painelOutput.setAttribute('output', 'binary');
            this.painelInput.placeholder = 'Informe um texto para codificar em binário:';
        }

        this.inputFocus();
        this.clearPainel();
    }

    this.clearPainel = () => {
        this.painelInput.value = '';
        this.painelOutput.value = '';
    }

    this.inputFocus = () => this.painelInput.focus();

    this.binaryEigthNumber = (binary) => {
        let numBinary = binary;
        while (numBinary.length < 8) {
            numBinary = '0' + numBinary
        }
        return numBinary;
    }

    this.translateToBinary = () => {
        const text = this.painelInput.value;
        const arrBinary = text.split('').map( char => {
            return  this.binaryEigthNumber( (char.charCodeAt()).toString(2) );
        });
        this.painelOutput.value = arrBinary.join(' ');
    }

    this.translateToText = () => {
        let binary = this.painelInput.value.replace(/\s/g, ''); // Removendo espaços na string

        binary.split('').forEach( char => {
            if ( !(char === '0' || char === '1') ) {
                alert('Não é um número binário!');
                this.painelInput.value = '';
                throw Error('Não é um número binário!');
            }
        });

        let arrNum = [];

        let line = '';
        for (let i = 0; i < binary.length; i++) {
            line += binary[i];
            if (line.length >= 8) {
                arrNum.push(line);
                line = '';
            }
        }
        if (line !== '' && line.length < 7) arrNum.push(line);

        arrNum.forEach( (binary, i) => {
            let number = 0;
            for (let i = binary.length - 1; i >= 0; i--) {
                const pow = (binary.length - 1) - i;
                if (binary[i] === '1') {
                    number += 2 ** pow;
                }
            }
            arrNum[i] = String.fromCharCode(number);
        });

        this.painelOutput.value = arrNum.join('');
    }

    this.translator = () => {
        const typeTranslator = this.painelInput.getAttribute('translate');
        if (typeTranslator === 'text') return this.translateToBinary();
        this.translateToText();
    }

    this.events = () => {
        document.getElementById('form').addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar envio do form;          
            this.translator();
        });

        document.querySelector('#form .linkPage').addEventListener('click', (e) => {
            e.preventDefault();
            this.convertion();    
        });
    }

    this.init = () => {
        this.events();  
    }
}

const translate = new TranslateBinary();
translate.init();