import React from "react";
import './wallet.css';
import autobind from "autobind-decorator";

export default class Wallet extends React.Component {
  state = { balance: null, amount: null };

  componentDidMount() {
    fetch('/api/wallet/').then(response => response.json()).then(({balance}) => this.setState({ balance }));
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
          <button disabled={!this.state.amount} className='wallet-deposit btn btn-primary'>Deposit</button>

            <input
              type='number'
              className='wallet-amount'
              name='amount'
              id='wallet-amount'
              value={this.state.amount}
              onChange={this.walletAmountChanged}
            />

          <button disabled={!this.state.amount} className='wallet-withdraw btn btn-primary'>Withdraw</button>
        </div>
      </div>
    );
  }

  @autobind
  walletAmountChanged(e) {
    this.setState({ amount: e.target.value });
  }
}
