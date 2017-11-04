import React, {Component} from 'react';
class Message extends Component {//renders each message.
    render() {
      if(this.props.type ==='incomingNotification'){
        return(
          <div className ="message system">
            {this.props.content}
          </div>
        );
      }
      if(this.props.type ==='incomingMessage' && this.props.username !== this.props.userName){
        let colorTobeAssigned;
        this.props.otherUsersTextColor.forEach((elem) => {
          if(Object.keys(elem) == this.props.username){
            colorTobeAssigned = elem[this.props.username];
          }
        })
        return (
          <div className = "message">
            <span style={{ color: colorTobeAssigned }} className = "message-username">{this.props.username}</span>
            <span className = "message-content">{this.props.content}</span>  
          </div>
        );  
      }else{
        return (
          <div className = "message">
            <span style={{ color:this.props.color }} className = "message-username">{this.props.username}</span>
            <span className = "message-content">{this.props.content}</span>  
          </div>
        );
      }
    }
}

export default Message;



