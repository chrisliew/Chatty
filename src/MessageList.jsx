import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor() {
    super();

  }


   render() {
    const messageMap = this.props.messages.map((mess, key) =>
      <Message singleMessage={mess} key={key}/>
    )

    return (
      <main>
      {messageMap}
      </main>
    )
  }
}
export default MessageList;