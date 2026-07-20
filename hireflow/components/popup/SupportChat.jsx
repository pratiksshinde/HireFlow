"use client";

import { useEffect, useRef, useState } from "react";
import {
  Headphones,
  MessageCircle,
  Send,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";
import { io } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "https://hireflow-backend-dizt.onrender.com";

function makeMessage(text, sender, status = "sent") {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text,
    sender,
    status,
    time: new Date(),
  };
}

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [agentOnline, setAgentOnline] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const isFirstMessage = useRef(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const socketRef = useRef(null);
  const supportUserIdRef = useRef(null);
  const pendingTexts = useRef([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    let guestId = sessionStorage.getItem("hireflow-support-id");

    if (!guestId) {
      guestId = `guest_${crypto.randomUUID()}`;
      sessionStorage.setItem("hireflow-support-id", guestId);
    }

    const userId = storedUserId || guestId;
    supportUserIdRef.current = userId;
    const socket = io(SOCKET_URL, { transports: ["websocket", "polling"] });
    socketRef.current = socket;

    const joinSupportRoom = () => {
      setIsConnected(true);
      socket.emit("join_room", userId);
    };

    const receiveMessage = ({ text, sender = "agent" }) => {
      if (!text) return;

      if (sender === "user") {
        const pendingIndex = pendingTexts.current.indexOf(text);
        if (pendingIndex !== -1) {
          pendingTexts.current.splice(pendingIndex, 1);
          setMessages((current) => {
            const index = current.findIndex(
              (message) =>
                message.sender === "user" &&
                message.text === text &&
                message.status === "sending",
            );
            if (index === -1) return current;
            const next = [...current];
            next[index] = { ...next[index], status: "sent" };
            return next;
          });
          return;
        }
      }

      setMessages((current) => [...current, makeMessage(text, sender)]);
    };

    socket.on("connect", joinSupportRoom);
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("agent_status", ({ online }) => setAgentOnline(Boolean(online)));
    socket.on("receive_message", receiveMessage);

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(focusTimer);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const text = inputMsg.trim();
    const socket = socketRef.current;
    if (!text || !socket) return;

    setMessages((current) => [...current, makeMessage(text, "user", "sending")]);
    pendingTexts.current.push(text);

    if (isFirstMessage.current) {
      socket.emit("user_first_message", { userId: supportUserIdRef.current, text });
      isFirstMessage.current = false;
    } else {
      socket.emit("send_message", {
        roomId: supportUserIdRef.current,
        text,
        sender: "user",
      });
    }

    setInputMsg("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {isOpen && (
        <section
          aria-label="HireFlow support chat"
          className="fixed inset-3 z-[100] flex flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_28px_80px_-20px_rgba(15,23,42,0.45)] sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[min(620px,calc(100vh-7.5rem))] sm:w-[390px] animate-chat-in"
        >
          <header className="relative overflow-hidden bg-slate-950 px-5 pb-5 pt-4 text-white">
            <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-emerald-400/20 blur-2xl" />
            <div className="relative flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-950/20">
                <Headphones size={21} strokeWidth={2.2} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold tracking-tight">HireFlow support</h2>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-300">
                  {agentOnline ? (
                    <Wifi size={12} className="text-emerald-400" />
                  ) : (
                    <WifiOff size={12} className="text-slate-400" />
                  )}
                  <span>
                    {agentOnline
                      ? "An agent is online"
                      : isConnected
                        ? "We typically reply shortly"
                        : "Connecting to support…"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close support chat"
                onClick={() => setIsOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <X size={19} />
              </button>
            </div>
          </header>

          <div className="chat-scrollbar flex flex-1 flex-col gap-3 overflow-y-auto bg-slate-50/80 px-4 py-5" aria-live="polite">
            {messages.length === 0 && (
              <div className="mx-auto mt-auto mb-auto max-w-[285px] text-center">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
                  <MessageCircle size={25} />
                </div>
                <h3 className="font-semibold text-slate-900">How can we help?</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Ask us about your profile, applications, subscription, or anything else in HireFlow.
                </p>
              </div>
            )}

            {messages.map((message) => {
              const isAgent = message.sender === "agent";
              return (
                <div key={message.id} className={`flex ${isAgent ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-5 shadow-sm ${
                      isAgent
                        ? "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                        : "rounded-br-md bg-slate-950 text-white"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{message.text}</p>
                    <p className={`mt-1 text-[10px] ${isAgent ? "text-slate-400" : "text-slate-400"}`}>
                      {message.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      {message.status === "sending" ? " · Sending" : ""}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-3">
            <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 pl-3 transition focus-within:border-emerald-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-100">
              <textarea
                ref={inputRef}
                rows={1}
                value={inputMsg}
                onChange={(event) => setInputMsg(event.target.value.slice(0, 1000))}
                onKeyDown={handleKeyDown}
                placeholder="Write a message…"
                aria-label="Message"
                className="max-h-28 min-h-10 flex-1 resize-none bg-transparent py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!inputMsg.trim()}
                aria-label="Send message"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-400 text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <Send size={17} />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-slate-400">Press Enter to send · Shift + Enter for a new line</p>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close support chat" : "Open support chat"}
        aria-expanded={isOpen}
        className={`fixed bottom-24 right-4 z-[99] grid h-14 w-14 place-items-center rounded-2xl shadow-[0_16px_36px_-10px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 sm:bottom-6 sm:right-6 ${
          isOpen
            ? "pointer-events-none scale-90 opacity-0"
            : "bg-slate-950 text-white hover:bg-slate-800"
        }`}
      >
        <MessageCircle size={24} />
        <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-[3px] border-white bg-emerald-400" />
      </button>
    </>
  );
}
