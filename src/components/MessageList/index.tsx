import React, { useEffect, useState } from 'react';
import { Message, MessageProps } from '../Message'
import { ScrollView, View } from 'react-native';
import { io } from 'socket.io-client'
import { styles } from './styles';
import { api } from '../../services/api';

let messagesQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on('new_message',(newMessage) => {
  messagesQueue.push(newMessage);
})

export function MessageList(){
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    async function fetchMessages(){
      const messagesResponse = await api.get('/messages/last3');
      setCurrentMessages(messagesResponse.data)
    }
    fetchMessages()   
  }, []);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0){
        setCurrentMessages(prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1]
        ].filter(Boolean));
        messagesQueue.shift();
      }
    }, 3000);

    // return () => clearInterval(timer);
  }, [])

  return (
    <ScrollView 
    style={styles.container}
    contentContainerStyle={styles.content}
    keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((message, index) => (
        <Message key={index} data={message}/>
      ))}
    </ScrollView>
  );
}