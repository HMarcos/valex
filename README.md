<p align="center">
  <h2 align="center">
    Valex
  </h2>
</p>

## Deploy

### Deploy link: https://hmarcos-valex-api.herokuapp.com/

## Usage

```bash
$ git clone https://github.com/HMarcos/valex

$ cd valex

$ npm install

$ npm run dev
```

### API:

```
- POST /cards (autenticada)
    - Rota em que as empresas podem criar cartões para os seus funcionários.
    - Os cartões só podem ser dos seguintes tipos: 
        ["groceries", "restaurant", "transport",  "education", "health"] 
    - headers: {"x-api-key:" "API-KEY da empresa"}
    - body: {
        "employeeId": 1,
        "cardType": "health",
    }
    - Retorna um objeto com as informações do cartão gerado.

- PUT /cards/:cardId/activation
    - Rota para que o empregado possa fazer a ativação do cartão.
    - headers: {}
    - body: {
        "employeeId": 1,
        "securityCode": "874",
        "password": "7492"
    }

- PUT /cards/:cardId/block
    - Rota para que o empregado possa bloquear o seu cartão.
    - headers: {}
    - body: {
        "employeeId": 1,
        "password": "7492"
    }

- PUT /cards/:cardId/unlock
    - Rota para que o empregado possa desbloquear o seu cartão.
    - headers: {}
    - body: {
        "employeeId": 1,
        "password": "7492"
    }

- GET /cards/:cardId/operations 
    - Retorna o saldo e todas as operações (pagamentos e recargas) de um cartão
    - headers: {}
    - body: {}
    - Resposta: {
        "balance": 1000,
        "transactions": []
        "recharges":[]
    }

- POST /recharges (autenticada)
    - Rota para que a empresa recarregue os cartões dos seus funcionários.
    - headers: {"x-api-key:" "API-KEY da empresa"}
    - body: {
        "cardId": 1,
        "amount": 1000
    }

- POST /purchases
    - Rota em que os funcionários possam comprar em Points of Sale (maquininhas).
    - headers: {}
    - body: {
        "employeeId": 1,
        "cardId": 2,
        "businessId": 4,
        "password": "7492"
        "amount": 1000
    }

```
