import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

  

class App extends Component {

  constructor(props){
    super(props);
    this.socket;
    this.messageNotification;
    this.state = {
      users:0,
      loading :false,
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };  
  }


  componentDidMount() {
    let chattyWebSocket = new WebSocket("ws://localhost:3001/", "protocolOne");
    chattyWebSocket.onopen = function(event){
      console.log("Connected to the server.");
    }
    this.socket = chattyWebSocket;
    this.socket.onmessage =(message) => {
      var messageFromServer = message.data;
      this.newMessageReceived(messageFromServer);
      
    }
  }
  newMessage = (type,user,messageNew) => {
    if(type === 'postNotification'){
      this.socket.send(JSON.stringify({
        type : 'postNotification',
        content : `${this.state.currentUser.name} has changed their name to ${user}.`
      }));
      this.state.currentUser.name = user;
    }else if(type === 'postMessage'){
      var newMessageObj = {type:'postMessage', username:this.state.currentUser.name,content:messageNew};  
      this.socket.send(JSON.stringify(newMessageObj));
    }
    
  }
 

  newMessageReceived = (messageNew) => {
    const data = JSON.parse(messageNew);
    console.log("messagenew:",messageNew);
    switch(data.type) {
      case "incomingMessage":
        // handle incoming message
        this.state.messages.push(data);
        const messageServer = this.state.messages;
        this.setState({messages:messageServer});
        break;
      case "incomingNotification":
        // handle incoming notification
          this.state.messages.push(data);
          this.messageNotification = data.content;
          const notification = this.state.messages;
          this.setState({messages:notification});
        break;
      case "numberOfUsersConnected":
        this.setState({users:data.numberOfUsersConnected});
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }
   
  }


  render() {
    if(this.state.loading){
      return (
        <h1>Loading the page.</h1> 
      );

    }else{
      return (
        <div>
          <nav className = "navbar">
            <a href="/" className = "navbar-brand">Chatty</a>
            <p className ="onlineUsers">{this.state.users} users online.</p>
          </nav>
          <MessageList messages={this.state.messages} messageNotification={this.messageNotification}/>
          <ChatBar userName={this.state.currentUser.name}  newMessage={this.newMessage} />
        </div>
      );
    }
  }
}
export default App;
