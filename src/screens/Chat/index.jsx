import React, { Fragment, useState, useEffect } from "react";
import queryString from 'query-string';
import io from 'socket.io-client';
import axios from 'axios';

// components
import TextContainer from './components/TextContainer/index';
import Messages from './components/MessageBox/index';
import InfoBar from './components/InforBar/index';
import Input from './components/Input/index';

import './Chat.scss'
const ENDPOINT = 'https://teamgaming.herokuapp.com/';
// const ENDPOINT = 'localhost:5000';

const defaultState = {
    name: '',
    room: '',
    image: '',
    users: '',
    message: '',
    messages: []
}

let socket;

const Chat = (props) => {
    const [name, setName] = useState(defaultState.nane)
    const [room, setRoom] = useState(defaultState.room)
    const [image, setImage] = useState(defaultState.image)
    const [users, setUsers] = useState(defaultState.users);
    const [message, setMessage] = useState(defaultState.message);
    const [messages, setMessages] = useState(defaultState.messages);
    const { location, history } = props

    useEffect(() => {
        let image
        if (location && location.state && location.state.imageCurrentUser) {
            image = location.state.imageCurrentUser
        }

        const { name, room } = queryString.parse(location.search);
    
        socket = io(ENDPOINT);
    
        setRoom(room);
        setName(name)
    
        socket.emit('join', { name, room, image }, (error) => {
          if(error) {
            history.push('/join')
            alert(error);
          }
        });
      }, [ENDPOINT, location.search]);
      
      useEffect(() => {
        if (location && location.state && location.state.imageCurrentUser) {
            setImage(location.state.imageCurrentUser)
        }

        socket.on('message', message => {
          setMessages(messages => [ ...messages, message ]);
        });
        
        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
    }, []);
    
      const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
      }

      console.log(messages)
    
      return (
        <div className="outerContainer">
          <div className="container">
              <InfoBar room={room} />
              <Messages messages={messages} currentUserAvatar={image} name={name} />
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </div>
          <TextContainer users={users}/>
        </div>
      );
}

export default Chat