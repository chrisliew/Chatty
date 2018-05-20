import React, {Component} from 'react';

class Message extends Component {
  render() {

     if(this.props.singleMessage.type === "incomingMessage") {
        return (
        <main className="messages">
        <div className="message">
          <span className="message-username">{this.props.singleMessage.username}</span>
          <span className="message-content">{this.props.singleMessage.content}</span>
          </div>
        </main>
        )

      } else {
        return (

        <div className="message system">{this.props.singleMessage.content}
        </div>
        )
      }
  }
}

export default Message;