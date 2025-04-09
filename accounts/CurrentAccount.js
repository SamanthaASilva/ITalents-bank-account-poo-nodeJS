const Account = require("./Account");
const prompt = require('prompt-sync')();

class CurrentAccount extends Account{
    constructor(owner, documentType, document, cellNumber, balance, loan){
        super(owner, documentType, document, cellNumber, balance);
        this.loan = loan;
    }

    showAccount(){
        return console.log(`Dados da conta: \n Nome: ${this.owner} \n Documento: ${this.document} \n Tipo do Documento: ${this.documentType} \n Número de Telefone: ${this.cellNumber} \n Saldo: ${this.balance} \n Empréstimo: ${this.loan}`);
    }

    withdraw() {
        if (this.balance <= 0) {
            return console.log(`Sua conta está negativa ou não possui saldo: ${this.balance} reais, deposite um valor para poder sacar.`);
        }
        console.log("Sua conta é do tipo corrente e portanto será cobrado uma taxa de 1.50 % sobre seu saldo!");
        const withdrawAmount = +prompt("Insira o valor para sacar: ");
        if (withdrawAmount > this.balance) {
            return console.log(`Insira um valor maior ou igual ao saldo disponível na conta: ${this.balance}`)
        }
        this.balance = (this.balance - 1.5).toFixed(2);
        this.balance -= withdrawAmount;
        return console.log(`O valor ${withdrawAmount} foi sacado!`);
    }
}

module.exports = CurrentAccount;