"use client";

import React, { useState, useEffect, useRef } from 'react';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SendIcon from '@mui/icons-material/Send';
import { io } from "socket.io-client";

const socket = io("https://hireflow-backend-dizt.onrender.com");

function SupportChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputMsg, setInputMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const [agentOnline, setAgentOnline] = useState(false);
    const isFirstMessage = useRef(true); // useRef so it doesn't cause re-render
    const messagesEndRef = useRef(null);

    const userId = "user_123"; // replace with your real logged-in user ID

    useEffect(() => {
        // Join room silently — does NOT ring agent
        socket.emit("join_room", userId);

        // Listen for agent online/offline status
        socket.on("agent_status", ({ online }) => {
            setAgentOnline(online);
        });

        // Listen for incoming messages (agent replies)
        socket.on("receive_message", ({ text, sender }) => {
            setMessages((prev) => [...prev, { id: Date.now(), text, sender }]);
        });

        return () => {
            socket.off("agent_status");
            socket.off("receive_message");
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!inputMsg.trim()) return;

        if (isFirstMessage.current) {
            // ── FIRST message: use special event that rings the agent ──
            socket.emit("user_first_message", {
                userId,
                text: inputMsg,
            });
            // Server already emits receive_message back to room,
            // so we don't add it to state manually here to avoid duplicate
            isFirstMessage.current = false; // all future messages are normal
        } else {
            // ── Subsequent messages: normal flow ──
            socket.emit("send_message", {
                roomId: userId,
                text: inputMsg,
                sender: "user",
            });
        }

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

            {isOpen && (
                <div className='absolute z-99999 md:bottom-20 md:right-10 sm:top-10 sm:right-10 w-[300px] h-[400px] bg-white rounded-lg shadow-lg p-5 sm:w-full sm:height-[100vh]'>
                    <span className='flex w-full items-center'>
                        <h2 className='text-lg font-bold mb-4'>
                            Support Chat <SupportAgentIcon />
                        </h2>
                        {/* Real agent online status from server */}
                        <span className={`ml-2 text-xs mb-4 ${agentOnline ? 'text-green-500' : 'text-red-400'}`}>
                            {agentOnline ? '● Agent Online' : '● Agent Offline'}
                        </span>
                        <h2 className='ml-auto cursor-pointer mb-4' onClick={() => setIsOpen(false)}>X</h2>
                    </span>

                    <div className='flex flex-col h-full'>
                        <div className='flex-1 overflow-y-auto mb-4'>
                            {messages.length === 0 && (
                                <p className='text-gray-400 text-sm text-center mt-10'>
                                    Send a message to connect with an agent!
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
                            <div ref={messagesEndRef} />
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
            )}
        </>
    );
}

export default SupportChat;