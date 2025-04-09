const prompt = require('prompt-sync')();

class Account {
    constructor(owner, documentType, document, cellNumber, balance) {
        this.owner = owner;
        this.documentType = documentType;
        this.document = document;
        this.cellNumber = cellNumber;
        this.balance = balance;
    }

    showAccount(){
        console.log(`Dados da conta: \n Nome: ${this.owner} \n Documento: ${this.document} \n Tipo do Documento: ${this.documentType} \n Número de Telefone: ${this.cellNumber} \n Saldo: ${this.balance}`);
        return true;
    }

    changeData(wantChange, newValue) {
        for (let i = 0; i < Object.keys(this).length; i++) {
            if (wantChange === Object.keys(this)[i]) {
                this[Object.keys(this)[i]] = newValue;
                console.log("Informação alterada com sucesso! Confira abaixo os dados de sua conta atualizado: ");
                return this.showAccount();
            }
        }
        return false;
    }
    
    deposit() {
        const depositAmount = +prompt("Insira o valor para depositar: ");
        this.balance += depositAmount;
        return console.log("Valor depositado com sucesso! Confira abaixo seu dados atualizados: ");
    }

    withdraw() {
        if (this.balance <= 0) {
            return console.log(`Sua conta está negativa ou não possui saldo: ${this.balance} reais, deposite um valor para poder sacar.`);
        }
        const withdrawAmount = +prompt("Insira o valor para sacar: ");
        if (withdrawAmount > this.balance) {
            return console.log(`Insira um valor maior ou igual ao saldo disponível na conta: ${this.balance}`)
        }
        this.balance -= withdrawAmount;
        return console.log(`O valor de ${withdrawAmount} reais foi sacado!`);
    }
}

module.exports = Account;