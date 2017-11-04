import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {//message list
    
    render() {
        console.log("Incoming Message");
        
        return (
            
            <main className="messages">
                
                {this.props.messages.map((singleMessage) =>
                   {            
                    return (<Message userName={this.props.userName} otherUsersTextColor={this.props.otherUsersTextColor} color={this.props.color}
                     key={singleMessage.id} content={singleMessage.content} username={singleMessage.username} type={singleMessage.type}/>)     
                    })
                }
            </main>
        )
    }
}
export default MessageList;
