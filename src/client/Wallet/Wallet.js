import React from "react";
import './wallet.css';
import autobind from "autobind-decorator";

export default class Wallet extends React.Component {
    state = {balance: null, amount: ''};

    async componentDidMount() {
        await this.refreshBalance();
    }

    refreshBalance() {
        return fetch('/api/wallet/').then(response => response.json()).then(({balance}) => this.setState({balance}));
    }

    render() {
        return (
            <div className='wallet'>
                <label>
                    Wallet ID:
                    <input
                        type='number'
                        className='wallet-id'
                        name='wallet-id'
                        id='wallet-id'
                    />
                </label>

                <label>
                    Balance:
                    <span className='wallet-balance' id='wallet-balance'>
            {this.state.balance}
          </span>
                </label>

                <div className='wallet-action'>
                    <button disabled={!this.amountValid()} className='wallet-deposit btn btn-primary'
                            onClick={this.deposit}>Deposit
                    </button>

                    <input
                        type='number'
                        className='wallet-amount'
                        name='amount'
                        id='wallet-amount'
                        value={this.state.amount}
                        onChange={this.walletAmountChanged}
                    />

                    <button disabled={!this.amountValid()} className='wallet-withdraw btn btn-primary'
                            onClick={this.withdraw}>Withdraw
                    </button>
                </div>
            </div>
        );
    }

    @autobind
    walletAmountChanged(e) {
        this.setState({amount: e.target.value});;
    }

    @autobind
    deposit() {
        this.postAmount('deposit');
    }

    amountValid() {
        return !!parseInt(this.state.amount);
    }

    postAmount(action) {
        if (this.amountValid()) {
            let amount = parseInt(this.state.amount);
            fetch('/api/wallet', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action,
                    amount
                })
            }).then(async response => {
                let body = await response.json();
                this.setState({balance: body.balance});
            }).catch(err => {
                alert(`${action} failed`);
                console.error(err);
            });
        }
    }

    @autobind
    withdraw() {
        this.postAmount('withdraw');
    }
}
