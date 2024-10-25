import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { db } from '../firebaseconfig';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

const Chat = ({ route }) => {
    const { t_uid, c_uid, username } = route.params; // Assume username is passed in route params for display
    const [messages, setMessages] = useState([]);

    // Load messages in real-time
    useEffect(() => {
        const chatid = t_uid > c_uid ? `${c_uid}-${t_uid}` : `${t_uid}-${c_uid}`;
        const messagesRef = collection(db, 'Chats', chatid, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const loadedMessages = snapshot.docs.map(doc => ({
                _id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt.toDate(), // Convert Firestore timestamp to JS Date
            }));
            setMessages(loadedMessages);
        });

        return () => unsubscribe();
    }, [t_uid, c_uid]);

    // Function to send a message
    const onSend = useCallback(async (messagesArray) => {
        const message = messagesArray[0];
        const chatid = t_uid > c_uid ? `${c_uid}-${t_uid}` : `${t_uid}-${c_uid}`;
        const messagesRef = collection(db, 'Chats', chatid, 'messages');

        await addDoc(messagesRef, {
            _id: message._id,
            text: message.text,
            createdAt: new Date(),
            user: {
                _id: c_uid,
                name: username,
            },
        });
    }, [t_uid, c_uid, username]);

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: c_uid,
                name: username,
            }}
            placeholder="Type a message..."
            showUserAvatar
        />
    );
};

export default Chat;
