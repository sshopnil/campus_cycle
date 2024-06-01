// src/PrivateChat.js
import React, { useState, useEffect, useRef} from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import SoftBox from 'components/SoftBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { Typography } from '@mui/material';
import SoftInput from 'components/SoftInput';
import SoftButton from 'components/SoftButton';

const socket = io('http://localhost:5001');

function PrivateChat() {
    const { helpId, username } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const chatRef = useRef(null);

    useEffect(() => {
        const room = `private_${helpId}`;
        socket.emit('join', { username: username, room });

        socket.on('private', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('private');
        };
    }, [username, helpId]);

    const sendMessage = () => {
        const room = `private_${helpId}`;
        socket.emit('private', { room, username: username, msg: message });
        setMessage('');
    };

    const scrollToBottom = () => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    };

    return (
    <DashboardLayout>
      <DashboardNavbar />
        <SoftBox>
            <h2>Private Chat</h2>
            <div ref={chatRef} style={{ height: '400px', overflowY: 'scroll' }}>
                {messages.map((msg, idx) => (
                    <Typography key={idx}>{msg.username}: {msg.msg}</Typography>
                ))}
            </div>
            <SoftInput
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                        sendMessage();
                        scrollToBottom();
                        ev.preventDefault();
                    }
                  }}
            />
            <SoftButton onClick={()=>{sendMessage(); scrollToBottom();}} style={{ marginTop: '10px' }}>Send</SoftButton>
        </SoftBox>
    </DashboardLayout>
    );
}

export default PrivateChat;
