// src/PrivateChat.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:5001');

function PrivateChat({ user }) {
    const { helpId } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const room = `private_${helpId}`;
        socket.emit('join', { username: user.username, room });

        socket.on('private', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('private');
        };
    }, [user.username, helpId]);

    const sendMessage = () => {
        const room = `private_${helpId}`;
        socket.emit('private', { room, username: user.username, msg: message });
        setMessage('');
    };

    return (
        <div>
            <h2>Private Chat</h2>
            <div>
                {messages.map((msg, idx) => (
                    <div key={idx}>{msg.username}: {msg.msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default PrivateChat;
