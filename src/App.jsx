import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading :false,
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        { id : "9bVde9",
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        { id : "7abc7X",
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };  
  }
   
  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      console.log("enter pressed");
      this.state.messages.push({id:'4',username:'Test',content:e.target.value});
      const message = this.state.messages
      this.setState({messages:message});
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
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar userName={this.state.currentUser.name} handleKeyPress={this.handleKeyPress.bind(this)}/>
        </div>
      );
    }
  }
}
export default App;
