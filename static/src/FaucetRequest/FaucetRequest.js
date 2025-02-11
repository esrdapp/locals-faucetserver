import React from "react";
import "./FaucetRequest.css";
import Eth from "ethjs";
import config from "react-global-configuration";
import axios from "axios";

const FaucetRequest = ({ onQueued }) => {


  const [address, setAddress] = React.useState("");
  const [cansubmit, setCansubmit] = React.useState(false);
  const [message, setMessage] = React.useState();

  React.useEffect(() => {
    setCansubmit(Eth.isAddress(address));
  }, [address]);

  let timeout;
  React.useEffect(() => {
    if (message) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }, [message]);

  const submit = () => {
    setCansubmit(false);

    let apiUrl = `${config.get("apiurl")}/donate/${config.get("accesskey")}/${address}`;
    axios
      .get(apiUrl)
      .then(response => {
        if (response.status === 200) {
          setAddress("");
          onQueued && onQueued();
          setMessage(response.data.message);
        }
      })
      // Catch any error here
      .catch(error => {
        if (!error || !error.response) {
          setMessage(`API error`);
          return;
        }
        if (error.response.status === 403) {
          setMessage(error.response.data.message);
          return;
        }
      });
  }

  return (
    <div className="">
      <section className="section">
        <div className="container bottompadding">
          <div className="field">
            <label className="label">
              Enter your HPB wallet address
            </label>
            <div className="control">
              <input
                className="input is-primary"
                type="text"
                placeholder="Enter your HPB wallet address"
                value={address}
                onChange={(e) => { setAddress(e.target.value) }}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button
                onClick={submit}
                disabled={!cansubmit}
                className="button is-link"
              >
                Send me a small amount of HPB
              </button>
            </div>
          </div>
          {message && (
            <article
              className="message"
              onClick={() => { setMessage(null) }}
            >
              <div className="message-body">
                <b>{message}</b><br />
              </div>
            </article>
          )}
        </div>
      </section>
    </div>
  )


};

// class FaucetRequest2 extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { targetAccount: "", requestrunning: false };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.clearMessages = this.clearMessages.bind(this);
//   }

//   handleChange(event) {
//     this.setState({ targetAccount: event.target.value });
//   }

//   clearMessages(event) {
//     this.setState({ faucetresponse: null, fauceterror: null });
//   }

//   handleSubmit(event) {
//     this.clearMessages();
//     if (Eth.isAddress(this.state.targetAccount)) {
//       this.setState({ requestrunning: true });

//       let apiUrl = config.get("apiurl") + "/donate/" + this.state.targetAccount;
//       axios
//         .get(apiUrl)
//         .then(response => {
//           this.setState({ requestrunning: false });
//           if (response.status === 200) {
//             this.setState({
//               faucetresponse: {
//                 address: response.data.address,
//                 amount: response.data.amount,
//                 txhash: response.data.txhash,
//                 etherscanlink:
//                   config.get("etherscanroot") + "/tx/" + response.data.txhash
//               }
//             });
//             return;
//           }
//         })
//         // Catch any error here
//         .catch(error => {
//           this.setState({ requestrunning: false });
//           if (!error || !error.response) {
//             this.setState({
//               fauceterror: {
//                 message: 'Error connecting to the API: ' + error.message,
//               }
//             });
//             return;
//           }
//           if (error.response.status === 403) {
//             let t = new timespan.TimeSpan(error.response.data.duration, 0, 0);
//             this.setState({
//               fauceterror: {
//                 message: error.response.data.message,
//                 duration: error.response.data.duration,
//                 timespan: t
//               }
//             });
//             return;
//           }
//         });
//     } else {
//       this.setState({ fauceterror: { message: "invalid address" } });
//     }
//     event.preventDefault();
//   }

//   componentDidMount() {
//     window.addEventListener("load", () => {
//       // See if there is a pubkey on the URL
//       let urlTail = window.location.search.substring(1);
//       if (Eth.isAddress(urlTail)) {
//         this.setState({ targetAccount: urlTail });
//         return;
//       }

//       // // If web3 is not injected (modern browsers)...
//       // if (typeof window.web3 === "undefined") {
//       //   // Listen for provider injection
//       //   window.addEventListener("message", ({ data }) => {
//       //     if (data && data.type && data.type === "ETHEREUM_PROVIDER_SUCCESS") {
//       //       this.eth = new Eth(window.ethereum);
//       //     }
//       //   });
//       //   // Request provider
//       //   window.postMessage({ type: "ETHEREUM_PROVIDER_REQUEST" }, "*");
//       // }
//       // // If web3 is injected (legacy browsers)...
//       // else {
//       //   this.eth = new Eth(window.web3.currentProvider);
//       //   this.eth
//       //     .accounts()
//       //     .then(accounts => {
//       //       if (accounts && accounts[0]) {
//       //         this.setState({ targetAccount: accounts[0] });
//       //       }
//       //     })
//       //     .catch(() => {});
//       // }
//     });
//   }

//   render() {
//     return (
//       <div className="">
//         <section className="section">
//           <div className="container bottompadding">
//             <form onSubmit={this.handleSubmit}>
//               <div className="field">
//                 <label className="label">
//                   Enter your testnet account address
//                 </label>
//                 <div className="control">
//                   <input
//                     className="input is-primary"
//                     type="text"
//                     placeholder="Enter your testnet account address"
//                     value={this.state.targetAccount}
//                     onChange={this.handleChange}
//                   />
//                 </div>
//               </div>
//               <div className="field is-grouped">
//                 <div className="control">
//                   <button
//                     disabled={this.state.requestrunning}
//                     className="button is-link"
//                   >
//                     Send me some HPB
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//           {this.state.requestrunning}

//           <div className="container">
//             {this.state.faucetresponse ? (
//               <article
//                 className="message is-success"
//                 onClick={this.clearMessages}
//               >
//                 <div className="message-body">
//                   <p>Request added to queue.</p>
//                 </div>
//               </article>
//             ) : (
//               <p />
//             )}
//             {this.state.fauceterror ? (
//               <article
//                 className="message is-danger"
//                 onClick={this.clearMessages}
//               >
//                 <div className="message-body">
//                   <b>{this.state.fauceterror.message}</b><br />
//                   {this.state.fauceterror.timespan ? (
//                     <span>
//                       You are greylisted for another{" "}
//                       {this.state.fauceterror.timespan.hours} hours and{" "}
//                       {this.state.fauceterror.timespan.minutes} minutes.
//                     </span>
//                   ) : (
//                     <span />
//                   )}
//                 </div>
//               </article>
//             ) : (
//               <p />
//             )}
//           </div>
//         </section>
//       </div>
//     );
//   }
// }

export default FaucetRequest;
