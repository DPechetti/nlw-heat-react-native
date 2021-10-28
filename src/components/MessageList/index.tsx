import React, { useEffect, useState } from 'react';
import socketClient from 'socket.io-client';
import { ScrollView } from 'react-native';

import { Message, MessageProps } from '../Message';
import { api } from '../../services/api';

import { styles } from './styles';

const messagesQueue: MessageProps[] = []

const socket = socketClient(String(api.defaults.baseURL))

socket.on('newMessage', (newMessage: MessageProps) => messagesQueue.push(newMessage))

export function MessageList(){
  const [messages, setMessages] = useState<MessageProps[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) 
        setMessages(prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1]
        ].filter(Boolean))

        messagesQueue.shift()
    }, 3000)

    return () => clearInterval(timer)
  }, [])
  
  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<MessageProps[]>('/messages/last3')
      setMessages(messagesResponse.data)
    }

    fetchMessages()
  }, [])

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps='never'>
      {messages.map(message => <Message key={message.id} data={message} />)}
    </ScrollView>
  );
}