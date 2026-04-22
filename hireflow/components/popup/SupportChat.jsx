"use client";

import React, { useState, useEffect, useRef } from 'react';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SendIcon from '@mui/icons-material/Send';
import { io } from "socket.io-client"; // 👈 import socket.io client

// ─── Connect to your backend ────────────────────────────────
// This creates a connection to your server the moment this file loads
const socket = io("http://localhost:4000");
// ────────────────────────────────────────────────────────────

function SupportChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputMsg, setInputMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const [connected, setConnected] = useState(false);
    const messagesEndRef = useRef(null); // for auto-scrolling

    // This userId would come from your auth system
    // For now using a hardcoded example — replace with real user id
    const userId = "user_123"; // 👈 replace with your actual logged-in user's ID

    // ── useEffect runs once when component mounts ────────────
    useEffect(() => {
        // 1. Tell the server we joined our personal room
        //    Server will create a room named "user_123"
        socket.emit("join_room", userId);

        // 2. Listen for messages coming FROM the server
        //    Whenever anyone in our room sends a message,
        //    the server sends it back to everyone via "receive_message"
        socket.on("receive_message", ({ text, sender }) => {
            setMessages((prev) => [
                ...prev,
                { id: Date.now(), text, sender }
            ]);
        });

        // 3. Know when we're connected
        socket.on("connect", () => {
            setConnected(true);
        });

        // Cleanup: remove listeners when component unmounts
        // (prevents memory leaks and duplicate listeners)
        return () => {
            socket.off("receive_message");
            socket.off("connect");
        };
    }, []); // empty [] = run only once on mount

    // Auto scroll to bottom when new message arrives
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!inputMsg.trim()) return; // don't send empty messages

        // Emit message to server
        // Server will broadcast it to everyone in this room (including agent)
        socket.emit("send_message", {
            roomId: userId,   // which room to send to
            text: inputMsg,   // message text
            sender: "user"    // who is sending
        });

        setInputMsg("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='p-5 m-5 absolute bottom-10 right-10'
            >
                <SupportAgentIcon height={24} width={24} />
            </button>

            {isOpen &&
                <div className='absolute bottom-20 right-10 w-[300px] h-[400px] bg-white rounded-lg shadow-lg p-5'>
                    <span className='flex w-full'>
                        <h2 className='text-lg font-bold mb-4'>
                            Support Chat <SupportAgentIcon />
                            {/* Show green dot if connected */}
                            <span className={`ml-2 text-xs ${connected ? 'text-green-500' : 'text-red-400'}`}>
                                {connected ? '● Online' : '● Connecting...'}
                            </span>
                        </h2>
                        <h2 className='ml-auto cursor-pointer' onClick={() => setIsOpen(false)}>X</h2>
                    </span>

                    <div className='flex flex-col h-full'>
                        <div className='flex-1 overflow-y-auto mb-4'>
                            {messages.length === 0 && (
                                <p className='text-gray-400 text-sm text-center mt-10'>
                                    Send a message to start chatting!
                                </p>
                            )}
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`mb-2 p-2 rounded max-w-[80%] ${
                                        msg.sender === 'agent'
                                            ? 'bg-gray-200 self-start'
                                            : 'bg-blue-400 text-white ml-auto'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            <div ref={messagesEndRef} /> {/* anchor for auto-scroll */}
                        </div>

                        <span className='text-sm text-gray-500 mb-10 w-full flex gap-1 items-center'>
                            <input
                                type="text"
                                placeholder='Type your message...'
                                className='border p-2 rounded w-full'
                                value={inputMsg}
                                onChange={(e) => setInputMsg(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button
                                className='bg-green-500 text-white p-2 rounded-full'
                                onClick={sendMessage}
                            >
                                <SendIcon />
                            </button>
                        </span>
                    </div>
                </div>
            }
        </>
    );
}

export default SupportChat;