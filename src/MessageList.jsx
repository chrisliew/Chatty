// jshint ignore: start

import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  // constructor(props) {
  //   super(props);
  //   console.log(props.message[1].content)
  // }




  render() {
     const listMessages = this.props.message.map((mess, key) =>
    <Message singleMessage={mess} key={key}/>

    );
    return (
      <div>
        {listMessages}
      </div>
    )
  }
}

export default MessageList;

