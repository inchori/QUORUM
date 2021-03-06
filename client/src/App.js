import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Quorum from "./contracts/Quorum.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

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
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const deployedNetwork2 = Quorum.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      const instance2 = new web3.eth.Contract(
        Quorum.abi,
        deployedNetwork2 && deployedNetwork2.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance2 }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };  
  
  _deposit = async () => {
    const { contract, myaccount } = this.state;
    var a=100 ; var b= 90;
    const deposit_amount = await contract.methods.balancing(a,b).send(
      {
        from : this.state.accounts[0],
        value : this.state.web3.utils.toWei('1', 'ether'),
        gas :900000
      }
    )
    // console.log(10);
    // this.deposit();
  }

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <header className="App-header">
        <h1>Quorum Hackathon!</h1>
        </header>
        <button id = "depositamount" onClick = {this._deposit}> Deposit </button>
        <h4>The address is: {this.state.accounts[0]}</h4>
        <div className="todo-list-template">
      </div>
      </div>
    );
  }
}

export default App;
