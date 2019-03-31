import Web3 from "web3";
import contract from 'truffle-contract';
import cropSureArtifact from "../../build/contracts/CropSure.json";

let OraclizeContract = contract(cropSureArtifact);

const app = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      OraclizeContract.setProvider(web3.currentProvider);

      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = cropSureArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        cropSureArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      // deploy contract
      OraclizeContract.deployed().then((instance) => {
        app.addEventListeners(instance);
      });
    } catch (error) {
      console.error(`Could not connect to contract or chain. error was "${error}"`);
    }
  },

  addEventListeners: function(instance){
    instance.ConsoleLog({}, (err, result) => {
      if(!err){
        console.log(result.args)
      }else{
        console.error(err)
      }
    });
    instance.PaymentSucceeded({}, (err) => {
       if (!err) {
        let message = document.getElementById("paymentSucceeded");
        message.hidden = false;

        console.log("payment succeeded.");
       }
    });
    instance.PaymentFailed({}, (err) => {
      if (!err) {
        let message = document.getElementById("paymentFailed");
        message.hidden = false;

        console.log("payment failed.");
      }
    });

    // this.meta.events.ConsoleLog({}, (err, result) => {
    //   if(!err){
    //     console.log(result.args)
    //   }else{
    //     console.error(err)
    //   }
    // });
    // this.meta.events.PaymentSucceeded({}, (err, result) => {
    //   if (!err) {
    //     console.log("payment succeeded.");
    //   }
    // });
    // this.meta.events.allEvents({}, (err, result) => {
    //   console.log("did we just receive an event????????");
    //   if(!err){
    //     console.log(result);
    //     console.log(result.args)
    //   }else{
    //     console.error(err)
    //   }
    // });

    instance.test({ from: this.account });
  },

  fireTestEvent: async function() {
    this.meta.methods.test();
  },

  sendCoin: async function() {
    const amount = parseInt(document.getElementById("amount").value);
    const receiver = document.getElementById("to").value;

    // const { sendCoin } = this.meta.methods;
    // await sendCoin(receiver, amount).send({ from: this.account });
  },
};

window.app = app;

window.addEventListener("load", () => {
  app.web3 = new Web3( 
    new Web3.providers.WebsocketProvider("ws://116.203.139.111:9545"),
  );

  app.start();
});
