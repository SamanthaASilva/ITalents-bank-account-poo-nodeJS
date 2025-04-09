const Account = require("./accounts/Account");
const CurrentAccount = require("./accounts/CurrentAccount");
const SavingsAccount = require("./accounts/SavingsAccount");
const prompt = require('prompt-sync')();

console.log("Seja Bem Vindo(a) a sua conta bancária moderna!");
accountActions();

function createNewAccount() {
    var accountTypeQuestion = "Qual tipo de conta deseja adquirir? 1 - Conta Poupança | 2 - Conta Corrente ";
    var accountType = +prompt(accountTypeQuestion);

    accountType = repeatChoiceOption(accountType, accountTypeQuestion, [1, 2]);

    const owner = prompt("Informe seu nome: ");
    const document = +prompt("Informe seu documento: ");
    const documentType = prompt("Informe o tipo do documento inserido: ");
    const cellNumber = +prompt("Informe seu número de telefone: ");

    var newAccount = new Account();
    newAccount = new CurrentAccount(owner, documentType, document, cellNumber, 0, 0);

    if (accountType === 1) {
        newAccount = new SavingsAccount(owner, documentType, document, cellNumber, 0);
    }

    newAccount.showAccount();
    return accountActions(newAccount);
}

function repeatChoiceOption(optionChosen, firstQuestion, validOptions) {
    var currentOption = optionChosen;
    while (!validOptions.includes(currentOption)) {
        currentOption = prompt("A opção escolhida não foi encontrada, tentar novamente?[Y/n] ");

        if (currentOption.toUpperCase() === "N") {
            return accountActions();
        }

        currentOption = +prompt(firstQuestion);
    }
    return currentOption;
}

function changeData(accountData) {
    getAccountData(accountData);
    accountData.showAccount();
    var wantChangeQuestion = "Escolha o dado que deseja alterar: 1 - Nome | 2 - Documento | 3 - Tipo do Documento | 4 - Número de Telefone ";
    var wantChange = +prompt(wantChangeQuestion);

    wantChange = repeatChoiceOption(wantChange, wantChangeQuestion, [1, 2, 3, 4]);
    var numericOutput = [2, 4];
    var newValue = "Digite o novo valor para alteração: ";
    newValue = numericOutput.includes(wantChange) ? +prompt(newValue) : prompt(newValue);
    wantChange = accountPropertiesMap(wantChange);
    accountData.changeData(wantChange, newValue);

    return accountActions(accountData);
}

function getAccountData(account) {
    if (account) {
        return true;
    }
    console.log("Nenhuma conta foi encontrada, cadastre uma nova conta!");
    return accountActions(account);
}

function accountPropertiesMap(optionChosen){
    const transformToStringProperties = {
        1: "owner",
        2: "document",
        3: "documentType",
        4: "cellNumber"
      };
    
      return transformToStringProperties[optionChosen] || optionChosen;
}

function calculateYieldRate(account){
    getAccountData(account);
    if(account.yieldRate >= 0) {
        account.getYieldRate();
        return accountActions(account);

    }

    console.log("Você não possui uma conta válida para esse tipo de ação, apenas conta poupança possuem rendimentos!");
    
    return accountActions(account);
}

function accountActions(account) {
    const action = +prompt("O que deseja fazer: 1 - criar uma nova conta | 2 - alterar dados | 3 - calcular investimento | 4 - depositar | 5 - sacar | 6 - sair ");
    if (action === 1) {
        return createNewAccount();
    }

    if (action === 2) {
        changeData(account);
    }

    if (action === 3) {
        calculateYieldRate(account);
    }

    if (action === 4) {
        if (getAccountData(account) && typeof account.deposit === "function") {
            account.deposit();  
            account.showAccount();
        }
        return accountActions(account);
    }

    if (action === 5) {
        if (getAccountData(account) && typeof account.withdraw === "function") {
            account.withdraw();  
            account.showAccount();
        }
        return accountActions(account);
    }

    if (action === 6) {
        return;
    }
}

