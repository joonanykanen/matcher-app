// src/components/Chat/ChatWindow.js, JN, 19.02.2024
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context';
import SendMessage from './SendMessage';
import { MessageList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

function ChatWindow() {
    const authToken = localStorage.getItem('auth_token');
    const { matchId } = useParams(); // Access userId from route params
    const { user, updateUser } = useContext(AppContext);
    const [messages, setMessages] = useState([]);

    const fetchData = async () => {
        try {
            if (authToken) {
                await updateUser();
            } else {
                // Redirect to login page
                // Consider redirecting from login page back here after successful login
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fetch chat messages for the given matchId
    const fetchMessages = async () => {
        try {
            const response = await fetch(`/api/messages/${matchId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
            }});
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Function to send a message
    const sendMessage = async (message) => {
        try {
            const response = await fetch(`/api/messages/${matchId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ text: message }),
            });
            const data = await response.json();
            fetchMessages(); // Update messages
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchMessages();        
        
        // Polling for new messages every 10 seconds
        const intervalId = setInterval(fetchMessages, 10000);

        return () => {
            clearInterval(intervalId); // Cleanup the interval on component unmount
        };
    }, []);

    if (user && messages) {
        return (
            <div>
                <h1>ChatWindow</h1>
                <MessageList
                    className='message-list'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={messages.map(message => ({
                        position: message.sender._id === user._id ? 'right' : 'left',
                        type: 'text',
                        text: message.text,
                        date: new Date(message.createdAt),
                    }))} />
                <SendMessage sendMessage={sendMessage} />
            </div>
        );
    }

}

export default ChatWindow;

// eof