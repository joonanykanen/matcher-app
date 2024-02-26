// src/components/Chat/ChatListView.js, JN, 19.02.2024
import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../context';
import { ChatList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

function ChatListView() {
    const authToken = localStorage.getItem('auth_token');
    const { user, updateUser, matches, updateMatches, messages, updateMessages } = useContext(AppContext);
    const [matchData, setMatchData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getNewestMessagesForMatches = async () => {
        await updateMessages();
        // TODO: Implement a more efficient way to get the latest message for each match
        // Buggy still. Need to fix

        messages.forEach(async (message) => {
            // Go through the messages, find the latest message for each match
            const matchIndex = matchData.findIndex((match) => match._id === message.sender._id || match._id === message.recipient._id);

            if (matchIndex !== -1) {
                const newMatchData = [...matchData];
                newMatchData[matchIndex].subtitle = message.text;
                newMatchData[matchIndex].date = message.createdAt;
                setMatchData(newMatchData);
            }
        });
        setLoading(false);
    }
            

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (authToken) {
                    await updateUser();
                    await updateMatches();
                } else {
                    // Redirect to login page
                    // Consider redirecting from login page back here after successful login
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (matches.length > 0) {

            const fetchMatchesData = async () => {
                try {
                    const promises = matches.map(async (id) => {
                        const response = await fetch(`/api/users/${id}`, {
                            headers: {
                                'Authorization': `Bearer ${authToken}`,
                            }
                        });
                        const match = await response.json();
                        return match;
                    });
                    const matchesData = await Promise.all(promises);
                    setMatchData(matchesData);

                    // Call getNewestMessagesForMatches after setting matchData
                    getNewestMessagesForMatches();

                } catch (error) {
                    console.error('Error fetching match data:', error);
                }
            };

            fetchMatchesData();
        }
    }, [matches]);

    const handleChatClick = (matchId) => {
        // Handle chat click, for example, redirect to chat page with the selected match
        window.location.href = `/chat/${matchId}`;
    };
    console.log(loading)
    if (user && matches && !loading) {
        return (
            <div>
                <h1>ChatList</h1>
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
                                subtitle: `${match.subtitle ? match.subtitle : 'No messages yet'}`,
                                date: `${match.date ? match.date : ''}`,
                            }
                        ]} />
                ))}
            </div>
        );
    }
    return null; // or a loading indicator
}

export default ChatListView;

// eof