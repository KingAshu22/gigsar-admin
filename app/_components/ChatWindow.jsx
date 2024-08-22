"use client";

import React, { useEffect, useState, useRef } from "react";
import getProfilePic from "../helpers/profilePic";
import { ChevronLeft, SendHorizonal, Info } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import Modal from "./Modal";
import { io } from "socket.io-client";

// Utility function to capitalize each word
const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Utility function to format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Utility function to format time without seconds and in 12-hour format
const formatTime = (timeStr) => {
  const date = new Date(timeStr);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

const ChatWindow = ({ selectedChat, handleBack }) => {
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState(selectedChat.artistId);
  const [messages, setMessages] = useState(selectedChat.message);
  const [newMessage, setNewMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { name, profilePic } = await getProfilePic(selectedChat.artistId);
      setName(name);
      setProfilePic(profilePic);
    };

    fetchProfile();

    // Establish socket connection
    socket.current = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);

    // Listen for incoming messages
    socket.current.on("messageReceived", (data) => {
      if (
        data.artistId === selectedChat.artistId &&
        data.contact === selectedChat.clientContact
      ) {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.current.disconnect();
    };
  }, [selectedChat]);

  useEffect(() => {
    setMessages(selectedChat.message);
  }, [selectedChat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    inputRef.current.focus();
  }, [messages]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevents the default action of the Enter key
        handleSendMessage();
      }
    };

    const input = inputRef.current;
    input.addEventListener("keydown", handleKeyDown);

    return () => {
      input.removeEventListener("keydown", handleKeyDown);
    };
  }, [newMessage]);

  useEffect(() => {
    const adjustScrollPosition = () => {
      if (inputRef.current) {
        const textareaTop = inputRef.current.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        if (textareaTop > viewportHeight - 50) {
          window.scrollTo({
            top: textareaTop - viewportHeight + 50,
            behavior: "smooth",
          });
        }
      }
    };

    inputRef.current.addEventListener("focus", adjustScrollPosition);

    return () => {
      inputRef.current.removeEventListener("focus", adjustScrollPosition);
    };
  }, []);

  const formatMessageContent = (content) => {
    return content
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line, index) => {
        if (line.startsWith("Date: ")) {
          return (
            <p key={index}>
              {capitalizeWords(line.split(": ")[0])}:{" "}
              {formatDate(line.split(": ")[1])}
            </p>
          );
        }
        return <p key={index}>{capitalizeWords(line)}</p>;
      });
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const messageData = {
          contact: selectedChat.clientContact,
          artistId: selectedChat.artistId,
          message: {
            content: newMessage,
            time: new Date().toISOString(),
            isSenderMe: false,
            isUnread: false,
          },
        };

        // Emit the message through Socket.io
        socket.current.emit("sendMessage", messageData);

        setMessages([
          ...messages,
          {
            content: newMessage,
            time: new Date().toISOString(),
            isSenderMe: false,
          },
        ]);
        setNewMessage("");
      } catch (error) {
        // Handle error
        console.error("Error submitting form:", error);
        toast.error("Error sending message");
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-300 flex items-center">
        <button className="md:hidden mr-2" onClick={handleBack}>
          <ChevronLeft />
        </button>
        <div className="flex items-center">
          <a
            href={`https://gigsar.com/artist/${selectedChat.artistId}`}
            className="flex items-center space-x-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={profilePic}
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">{name}</h2>
              <p className="text-sm text-gray-600">{selectedChat.clientName}</p>
            </div>
          </a>
        </div>
        <button
          className="ml-auto text-gray-600 hover:text-gray-900"
          onClick={() => setIsModalOpen(true)}
        >
          <Info />
        </button>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              message.isSenderMe ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                message.isSenderMe
                  ? "bg-gray-300 text-black"
                  : " bg-primary text-white"
              }`}
            >
              <div>{formatMessageContent(message.content)}</div>
              <span className="block text-xs mt-1 text-right">
                {formatTime(message.time.$date || message.time)}
              </span>
            </div>
            <div ref={messagesEndRef} />
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-300 flex items-center space-x-2">
        <input
          type="text"
          className="flex-grow p-2 border rounded-lg"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          ref={inputRef}
        />
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg"
          onClick={handleSendMessage}
        >
          <SendHorizonal />
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Client Details"
      >
        <div>
          <p>
            <strong>Name:</strong> {selectedChat.clientName}
          </p>
          <p>
            <strong>Contact:</strong> {selectedChat.clientContact}
          </p>
          <p>
            <strong>Email:</strong> {selectedChat.clientEmail}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ChatWindow;
