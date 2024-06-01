// src/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import SoftBox from 'components/SoftBox';
import SoftInput from 'components/SoftInput';
import SoftButton from 'components/SoftButton';

const socket = io('http://localhost:5001');

function Chat({ user }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [helpSubject, setHelpSubject] = useState('');
    const [helps, setHelps] = useState([]);
    const navigate = useNavigate();
    const chatRef = useRef(null);

    useEffect(() => {
        socket.emit('join', { username: user.username });

        // Load old conversation
        const loadOldConversation = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/messages/${user.user_id}`);
                setMessages(response.data);
                scrollToBottom();
            } catch (error) {
                console.error('Error loading old conversation:', error);
            }
        };

        loadOldConversation();

        socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.on('help', (help) => {
            setHelps((prevHelps) => [...prevHelps, help]);
        });

        return () => {
            socket.off('message');
            socket.off('help');
        };
    }, [user.username]);

    const sendMessage = () => {
        socket.emit('message', { user_id: user.user_id, username: user.username, msg: message });
        setMessage('');
    };

    const sendHelp = () => {
        socket.emit('help', { user_id: user.user_id, username: user.username, subject: helpSubject });
        setHelpSubject('');
    };

    const joinHelp = (help_id) => {
        navigate(`/private/${help_id}`);
    };

    const scrollToBottom = () => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    };
    return (
        <SoftBox>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                <h2>Global Chat</h2>
                    <div ref={chatRef} style={{ height: '400px', overflowY: 'scroll' }}>
                        <div>
                            {messages.map((msg, idx) => (
                                (msg.msg === `${msg.username} has joined the chat`) ? 
                                <Typography key={idx} sx={{color:"powderblue", textAlign:"center", fontSize: 16}}>{msg.msg}</Typography>
                                :
                                <Typography key={idx}>{msg.username}: {msg.msg}</Typography>
                            ))}
                        </div>
                    </div>
                    <SoftInput
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message"
                        style={{ width: '100%', marginTop: '10px' }}
                        onKeyDown={(ev) => {
                            if (ev.key === 'Enter') {
                                sendMessage();
                                scrollToBottom();
                                ev.preventDefault();
                            }
                          }}
                    />
                    <SoftButton onClick={()=>{sendMessage(); scrollToBottom();}} style={{ marginTop: '10px' }} color="primary">Send</SoftButton>
                </Grid>
                <Grid item xs={12} md={4}>
                <h2>Help Requests</h2>
                    <Card style={{ height: '400px', overflowY: 'scroll' }}>
                        <CardContent>
                            {helps.map((help, idx) => (
                                <div key={idx}>
                                    <SoftButton onClick={() => joinHelp(help.help_id)} color="success">{help.subject} - Help this person</SoftButton>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <SoftInput
                        type="text"
                        value={helpSubject}
                        onChange={(e) => setHelpSubject(e.target.value)}
                        placeholder="Help subject"
                        style={{ width: '100%', marginTop: '10px' }}
                        onKeyDown={(ev) => {
                            if (ev.key === 'Enter') {
                                sendHelp();
                                scrollToBottom();
                                ev.preventDefault();
                            }
                          }}
                    />
                    <SoftButton onClick={sendHelp} style={{ marginTop: '10px' }} color="secondary">Request Help</SoftButton>
                </Grid>
            </Grid>
        </SoftBox>
    );
}

export default Chat;
