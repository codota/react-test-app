# Codota's React Test App

This is a basic wallet app, implemented using react and a node backend.

Wallet data is stored in mongodb.

## Running instructions

```bash
docker-compose up -d   # this will start a local mongo in docker
npm install
npm run dev
```

## The Test

Add a transactions page, that will display a list of the last 10 transactions with the following structure - transaction time, amount, balance.

Add the ability to navigate from the wallet page to the transactions page and back.

__Bonus__

Implement real time balance updates in the wallet page.
