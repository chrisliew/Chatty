
import React, {Component} from 'react';


class ChatBar extends Component {
   constructor(props) {
    super(props);
  // console.log(props.currentUser);
  // console.log(props)
  this.onContent = this.onContent.bind(this);
  this.onCurrentUser = this.onCurrentUser.bind(this);
  }

  //when someone writes in chatbar message and hits enter, pass data back to the
  //app.jsx and into the database of names.
  //
  //Where to add bind?

  onContent(event) {
    //this takes the data from the props, and returns what the user types into input.
    if(event.key === 'Enter') {
      this.props.onNewPost(event.target.value); // this is for the text itself
    }
  }

  onCurrentUser(event) {
    if(event.key === 'Enter') {
      this.props.handleChange(event.target.value);
      console.log("This is the event:" , event);
    }
  }




  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"  onKeyPress={this.onCurrentUser} defaultValue={this.props.currentUser.name}/>
        <input className="chatbar-message" onKeyPress={this.onContent} placeholder="Type a message and hit ENTER"   />
      </footer>
    )
  }
}

export default ChatBar;