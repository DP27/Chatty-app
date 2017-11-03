import React, {Component} from 'react';

class ChatBar extends Component {

  username = null;
  handleKeyPressUser = (e) => {
    if(e.key === 'Enter'){
      let type = 'postNotification'
      this.props.newMessage(type,e.target.value,'');
    }
  }
  
 handleKeyPress = (e) =>{
   if(e.key === 'Enter'){
     let type = 'postMessage';
     this.props.newMessage(type,this.props.userName,e.target.value);
     e.target.value = null;
   }
 } 
 
 

  
  render() {
    
    return (
    <footer className = "chatbar">
        <input className = "chatbar-username" onKeyPress = {this.handleKeyPressUser} placeholder={this.props.userName} />
        <input className = "chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress}/>
    </footer>
      
    );
  }
}



export default ChatBar;




