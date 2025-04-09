const Account = require("./Account");
const prompt = require('prompt-sync')();

class SavingsAccount extends Account {
    yieldRate = 0;
    constructor(owner, documentType, document, cellNumber, balance) {
        super(owner, documentType, document, cellNumber, balance);
    }

    showAccount(){
        return console.log(`Dados da conta: \n Nome: ${this.owner} \n Documento: ${this.document} \n Tipo do Documento: ${this.documentType} \n Número de Telefone: ${this.cellNumber} \n Saldo: ${this.balance} \n Investido: ${this.yieldRate}`);
    }
    
    getYieldRate() {
        let valueInvestment = +prompt("Informe o valor que deseja calcular o rendimento: ");
        if (this.balance < valueInvestment) {
            return console.log(`Ocorreu um erro ao calcular rendimento, saldo diponível: ${this.balance}, tente novamente mais tarde!`)
        }
        let timeInvested = +prompt("Informe por quanto tempo deseja deixar investido: 1 - até 6 meses | 2 - até 1 ano | 3 - até 2 anos ");
        const yieldRate = this.calculateYieldRate(valueInvestment, timeInvested);
        console.log(`O rendimento de ${valueInvestment} reais após o período selecionado será de ` + "R$" + yieldRate + " reais");
        return this.invest(valueInvestment);
    }

    calculateYieldRate(valueInvestment, timeInvested){
        if (timeInvested === 1) {
            this.yieldRate = (1 - (22.5 / 100)) * 10 / 100;
            return valueInvestment = valueInvestment * (1 + this.yieldRate) ^ 0.5;
        }
        if (timeInvested === 2) {
            this.yieldRate = (1 - (20 / 100)) * 10 / 100;
            return valueInvestment = valueInvestment * (1 + this.yieldRate) ^ 1;
        }
        if (timeInvested === 3) {
            this.yieldRate = (1 - (17.5 / 100)) * 10 / 100;
            return valueInvestment = valueInvestment * (1 + this.yieldRate) ^ 2;
        }
        return valueInvestment;
    }

    invest(valueInvestment){
        const invest = prompt("Deseja investir esse valor?[Y/n] ");
        if (invest.toUpperCase() === "Y") {
            this.yieldRate = valueInvestment;
            this.balance -= valueInvestment;
            console.log("Valor selecionado investido! Confira seus dados atualizados: ");
            return this.showAccount();
        }
        return console.log("Obrigado por utilizar a ferramenta, seu saldo disponível não foi alterado/investido.");
    }
}

module.exports = SavingsAccount;