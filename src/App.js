import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core'
import Message from './Message';
// import db from './firebase';
// import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send'
import IconButton from '@material-ui/core/IconButton'
import axios from 'axios';
import Pusher from 'pusher-js';

const pusher = new Pusher('827f950e82b87ac4ae87', {
  cluster: 'ap2'
});

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')

  // useEffect(() => {
  //   db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
  //     setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
  //   })
  // }, [])
  const  sync = async ()=> {
    await axios.get('https://messenger-clone-smaple.herokuapp.com/retrieve/conversation')
    .then((res)=>{
      console.log(res.data);
      setMessages(res.data)
    })
  }
  useEffect(() => {
   sync()
  },  [])
  

  useEffect(() => {
    const channel = pusher.subscribe('messages');
    channel.bind('newMessage', function(data) {
      sync()
    });
   },  [username])
  
   
  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, []) 


  const sendMessage = (e) => {
    e.preventDefault()
    axios.post('https://messenger-clone-smaple.herokuapp.com/save/messages',{
      username: username,
      message: input,
      timestamp: Date.now()
    })
  //   db.collection('messages').add({
  //     message: input,
  //     username: username,
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp()
  //   })

    setInput('')
  }

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt="messenger logo" />
      <h2>Welcome {username}</h2>

      <form className='app__form' >
        <FormControl className='app__formControl' >
          <Input className='app__input' placeholder='Enter a message...' value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton className='app__iconButton' variant='text' color='primary' disabled={!input} onClick={sendMessage} type="submit" >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {
          messages.map(message => (
            <Message key={message._id} message={message} username={username} />
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
