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
                // Finding messages for each match
                const matchMessages = messages.filter(message => message.sender._id === matchId || message.recipient._id === matchId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
                let matchDetails = {
                    _id: matchId,
                    subtitle: "No messages yet",
                    date: "", 
                };
    
                if (matchMessages.length > 0) {
                    const newestMessage = matchMessages[0];
                    matchDetails.subtitle = newestMessage.text;
                    matchDetails.date = newestMessage.createdAt;
                }
    
                return fetch(`/api/users/${matchId}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    }
                })
                .then(response => response.json())
                .then(matchInfo => ({ ...matchDetails, ...matchInfo }));
            });
    
            Promise.all(updatedData)
            .then(data => {
                setMatchData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to update match data:", error);
                setLoading(false);
            });
        };
    
        if (matches.length > 0) {
            updateMatchDataWithMessages();
        } else {
            setLoading(false); // Handle the case where there are no matches
        }
    }, [matches, messages]); // Reacting to changes in both matches and messages

    const handleChatClick = (matchId) => {
        window.location.href = `/chat/${matchId}`;
    };

    if (loading) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    if (user && matches.length > 0) {
        console.log(matchData)
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
                                date: match.date ? new Date(match.date) : null,
                            }
                        ]} />
                ))}
            </div>
        );
    } else {
        return <div>
            <Typography variant="h4" style={{ padding: '10px' }}>No matches yet!😔</Typography>
        </div>;
    }
    return null;
}

export default ChatListView;

// eof