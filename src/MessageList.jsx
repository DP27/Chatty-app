import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
    render() {
        console.log("Incoming Message");
        return (
            
            <main className="messages">
                {this.props.messages.map((singleMessage) =>
                    {
                    return (<Message key={singleMessage.id} content={singleMessage.content} username={singleMessage.username} />)     
                    })
                }
            </main>
        )
    }
}
export default MessageList;
