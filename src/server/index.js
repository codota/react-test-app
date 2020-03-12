require('dotenv').config();

const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const asyncHandler = require('express-async-handler')

const app = express();
app.use(express.static('dist'));
app.use(bodyParser.json());

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

let db;
mongodb.connect(process.env.DB_URL).then(client => db = client.db()).catch(err => {
    console.error(err);
    process.exit(-1);
});

let balance = 10;

app.get('/api/wallet/:walletId', asyncHandler(async (req, res) => {
    res.json({ balance: await getWalletBalance(req.params.walletId) });
}));

app.post('/api/wallet/:walletId', asyncHandler(async function(req, res) {
    let balance = await getWalletBalance(req.params.walletId);
    switch (req.body.action) {
        case 'deposit':
            balance += req.body.amount;
            break;
        case 'withdraw':
            balance -= req.body.amount;
            break;
    }

    await setWalletBalance(req.params.walletId, balance);
    res.json({balance});
}));


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

async function getWalletBalance(walletId) {
    let wallet = await db.collection('wallets').findOne({_id: walletId});
    let balance = wallet ? wallet.balance : 0;
    return balance;
}

async function setWalletBalance(walletId, balance) {
    await db.collection('wallets').update({_id: walletId}, { _id: walletId, balance }, { upsert: true });
}