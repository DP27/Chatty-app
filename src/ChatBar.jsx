import React, {Component} from 'react';

class ChatBar extends Component {

  username = null;
  handleKeyPressUser = (e) => {
  
    this.username = e.target.value;
    
  }
  
 handleKeyPress = (e) =>{
   if(e.key === 'Enter'){
     this.props.newMessage(e.target.value,this.username);
     e.target.value = null;
   }
 } 
 
 

  
  render() {
    
    return (
    <footer className = "chatbar">
        <input className = "chatbar-username" onChange = {this.handleKeyPressUser} placeholder={this.props.userName} />
        <input className = "chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress}/>
    </footer>
      
    );
  }
}



export default ChatBar;




