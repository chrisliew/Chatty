import React, {Component} from 'react';
import { createDeflateRaw } from 'zlib';

class Message extends Component {
  render() {

     if (this.props.singleMessage.content.includes("jpg") ){
      return (
        <div className="image-link">
          <img className="image-link" src={this.props.singleMessage.content}/>
        </div>
      )
    }

     else if(this.props.singleMessage.type === "incomingMessage") {
        return (
        <main className="messages">
        <div className="message">
          <span className="message-username">{this.props.singleMessage.username}</span>
          <span className="message-content">{this.props.singleMessage.content}</span>
          </div>
        </main>
        )
      } 
     
      else {
        return (
          <div className="message system">{this.props.singleMessage.content}
          </div>
        )
      }
  }
}

export default Message;