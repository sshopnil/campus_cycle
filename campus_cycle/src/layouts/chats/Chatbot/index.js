// src/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [error, setError] = useState("");
    const chatWindowRef = useRef(null);

    const handleSend = async () => {
        if (userMessage.trim() === '') return;

        const newMessages = [...messages, { sender: 'user', text: userMessage }];

        try {
            // Format the history
            const formattedHistory = newMessages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }));

            const response = await axios.post('http://localhost:5001/gemini', {
                history: formattedHistory,
                message: userMessage
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = response.data;
            console.log(data);

            setMessages([...newMessages, { sender: 'model', text: data }]);
            setUserMessage('');
        } catch (e) {
            console.log(e);
            setError("Failed to send message");
        }
    };

    const handleClear = () => {
        setMessages([]);
        setError("");
    };

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="chatbot">
            <div className="chat-window" ref={chatWindowRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender}`} dangerouslySetInnerHTML={{ __html: msg.text}}>
                        
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type a career question..."
                    onKeyDown={(ev) => {
                        if (ev.key === 'Enter') {
                            handleSend();
                            ev.preventDefault();
                        }
                      }}
                />
                {!error && <button onClick={handleSend}>Send</button>}
                {error && <button onClick={handleClear}>Clear</button>}
            </div>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Chatbot;
