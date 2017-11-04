import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
    color = ["AliceBlue","Chartreuse","DarkGoldenRod","FireBrick"];
    colorAssigned = this.color[parseInt(Math.random()*4,10)];
    render() {
        console.log("Incoming Message");
        
        return (
            
            <main className="messages">
                
                {this.props.messages.map((singleMessage) =>
                   {            
                    return (<Message color={this.colorAssigned} key={singleMessage.id} content={singleMessage.content} username={singleMessage.username} type={singleMessage.type}/>)     
                    })
                }
            </main>
        )
    }
}
export default MessageList;
