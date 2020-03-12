import React from "react";
import './wallet.css';
export default class Wallet extends React.Component {
    state = { balance: null };

  componentDidMount() {
    // this.setState({ balance:10 });
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
          <button className='wallet-deposit btn btn-primary'>+</button>

            <input
              type='number'
              className='wallet-amount'
              name='amount'
              id='wallet-amount'
            />

          <button className='wallet-withdraw btn btn-primary'>-</button>
        </div>
      </div>
    );
  }
}
