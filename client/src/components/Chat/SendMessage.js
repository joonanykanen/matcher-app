// src/components/Chat/SendMessage.js, JN, 26.02.2024
import React, { useState } from 'react';
import { Input } from 'react-chat-elements';
import SendIcon from '@mui/icons-material/Send';
import 'react-chat-elements/dist/main.css';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

function SendMessage({ sendMessage }) {
    const { t } = useTranslation();
    const [message, setMessage] = useState('');

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        sendMessage(message);
        setMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div>
            <Input
                type="text"
                value={message}
                placeholder={t('typeMessage')}
                onChange={handleMessageChange}
                onKeyPress={handleKeyPress}
                multiline={false}
                inputStyle={{ borderRadius: '20px' }}
                rightButtons={<Button variant="contained" endIcon={<SendIcon />} onClick={handleSendMessage}>{t('send')}</Button>}/>
        </div>
    );
}

export default SendMessage;


// eof