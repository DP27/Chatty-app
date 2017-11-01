import React, {Component} from 'react';

class ChatBar extends Component {
  
 

  
  render() {
    
    return (
    <footer className = "chatbar">
        <input className = "chatbar-username" placeholder={this.props.userName} />
        <input className = "chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.handleKeyPress}/>
    </footer>
      
    );
  }
}



export default ChatBar;




