// src/components/Chat/ChatListView.js, JN, 19.02.2024
import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../context';
import { Typography } from '@mui/material';
import { ChatList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

function ChatListView() {
    const authToken = localStorage.getItem('auth_token');
    const { user, updateUser, matches, updateMatches, messages, updateMessages } = useContext(AppContext);
    const [matchData, setMatchData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (authToken) {
                    await updateUser();
                    await updateMatches();
                    await updateMessages(); // Ensure messages are fetched after matches
                } else {
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Ensure to stop loading regardless of outcome
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const updateMatchDataWithMessages = () => {
            const updatedData = matches.map(matchId => {
                const matchMessages = messages.filter((message) => {
                    return message.sender._id === matchId || message.recipient._id === matchId;
                }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort to get the newest message

                let matchDetails = {
                    _id: matchId,
                    subtitle: 'No messages yet',
                    date: '',
                    // Include other default/template match details here
                };

                if (matchMessages.length > 0) {
                    const newestMessage = matchMessages[0];
                    matchDetails.subtitle = newestMessage.text;
                    matchDetails.date = newestMessage.createdAt;
                }

                // Assume fetchMatchDetails is an async function to fetch match details
                return fetch(`/api/users/${matchId}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    }
                }).then(response => response.json())
                  .then(matchInfo => ({ ...matchDetails, ...matchInfo })); // Combine fetched match details with messages
            });

            Promise.all(updatedData).then(data => {
                setMatchData(data);
                setLoading(false);
            });
        };

        if (matches.length > 0 && messages.length > 0) {
            updateMatchDataWithMessages();
        }
    }, [messages]);

    const handleChatClick = (matchId) => {
        window.location.href = `/chat/${matchId}`;
    };

    if (loading) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    if (user && matches.length > 0) {
        return (
            <div>
                <Typography variant="h5" style={{ padding: '10px' }}>List of chats</Typography>
                {matchData.map((match, index) => (
                    <ChatList
                        key={index}
                        id={match.id}
                        className='chat-list'
                        onClick={() => handleChatClick(match._id)}
                        dataSource={[
                            {
                                avatar: `/${match.profilePic}`,
                                alt: 'match_avatar',
                                title: `${match.firstName} ${match.lastName}`,
                                subtitle: match.subtitle,
                                date: new Date(match.date),
                            }
                        ]} />
                ))}
            </div>
        );
    }
    return null;
}

export default ChatListView;

// eof