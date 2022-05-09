import React, { Component } from "react";
import BidderContract from "./contracts/Bidder.json";
import getWeb3 from "./getWeb3";
import { each } from 'lodash';
import { PRODUCTS } from './constants';
import Product from './components/Product';

import './tailwind.css';

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BidderContract.networks[networkId];
      const instance = new web3.eth.Contract(
        BidderContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    each(PRODUCTS, async prod => {
      if(!await contract.methods.getOption(prod.name).call()) {
        await contract.methods.addOption(prod.name).send({ from: accounts[0] });
      }
    }); 

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getOptionsCount().call();

    console.log(response);

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Bid For Me</h1>
        <div>Total no. of products: {this.state.storageValue}</div>
          <section>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                <table className="table-auto min-w-full border text-center border">
                  <tbody>
                    {PRODUCTS.map((prod, idx) => {
                      return <Product key={idx} image={prod.image} name={prod.name} price={prod.value} id={prod.id} onBid={(id) => this.onBid(id)} />;
                    })}
                  </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
