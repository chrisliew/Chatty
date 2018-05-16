
import React, {Component} from 'react';


class ChatBar extends Component {
   constructor(props) {
    super(props);
  // console.log(props.currentUser);
  // console.log(props)
  this.onContent = this.onContent.bind(this);
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



  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"  defaultValue={this.props.currentUser.name}/>
        <input className="chatbar-message" onKeyPress={this.onContent} placeholder="Type a message and hit ENTER"   />
      </footer>
    )
  }
}

export default ChatBar;