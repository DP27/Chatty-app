import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

  

class App extends Component {

  constructor(props){
    super(props);
    this.socket;
    this.state = {
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
  newMessage = (messageNew,user) => {
    if(user){
      this.state.currentUser.name = user;
    }
    var newMessageObj = {username:this.state.currentUser.name,content:messageNew};
    console.log('message typed',messageNew);
    //this.state.messages.push(newMessageObj);
    this.socket.send(JSON.stringify(newMessageObj));
    //const message = this.state.messages;
    //this.setState({messages:message});
   
  }
  // newUserName = (name) => {
  //   this.state.currentUser.name = name;
  
  // }

  newMessageReceived = (messageNew) => {
    console.log('received from server',messageNew);
    this.state.messages.push(JSON.parse(messageNew));
    const messageServer = this.state.messages;
    console.log(messageServer);
    this.setState({messages:messageServer});
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
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar userName={this.state.currentUser.name}  newMessage={this.newMessage} />
        </div>
      );
    }
  }
}
export default App;
