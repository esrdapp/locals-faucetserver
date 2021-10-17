import React, { Component } from "react";

class Comp extends Component {
  // Adds a class constructor that assigns the initial state values:
  constructor() {
    super();
    this.state = {
      faucetinfo: null
    };
  }
  // The render method contains the JSX code which will be compiled to HTML.
  render() {
    return (
      <section className="section">
        <div className="content has-text-centered has-text-weight-light">
          <p>
		For inquiries, support or just to say thanks please reach out to us in the 
	    <a href="https://t.me/hpbglobal" target="_blank">HPB GLobal</a> Telegram group - 
</p>
<div className="level">
<div className="level-item">



<div className="media">
      <div className="media-left">
        <figure className="image is-64x64">
          <img src="" alt="HPB"/>
        </figure>
      </div>
      <div className="media-content">
        <p className="title is-4">DeFi Karen</p>
        <p className="subtitle is-6"><a href="https://twitter.com/HPB_Global" target="_blank">HPB Global</a></p>
      </div>
</div>



</div>
</div>
        </div>
      </section>
    );
  }
}

export default Comp;
