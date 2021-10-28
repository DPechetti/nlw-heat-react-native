import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { api } from '../../services/api';

import { Message, MessageProps } from '../Message';

import { styles } from './styles';

export function MessageList(){
  const [messages, setMessages] = useState<MessageProps[]>([])

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