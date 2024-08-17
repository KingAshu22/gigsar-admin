"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ChatList from "@/app/_components/ChatList";
import ChatWindow from "@/app/_components/ChatWindow";
import getProfilePic from "@/app/helpers/profilePic";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [profilePics, setProfilePics] = useState({});
  const router = useRouter();

  useEffect(() => {
    getAllMessages();
  }, []);

  const getAllMessages = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/admin-get-message`
      );

      if (response.data) {
        const formattedChats = formatChats(response.data.allMessages);
        setChats(formattedChats);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      router.push("/admin-dashboard");
    }
  };

  const formatChats = (allMessages) => {
    const chatData = [];

    allMessages.forEach((client) => {
      client.messages.forEach((messageGroup) => {
        const { artistId, message } = messageGroup;
        const lastMessage = message[message.length - 1];

        chatData.push({
          artistId,
          clientId: client.clientId,
          clientName: client.clientName,
          clientContact: client.clientContact,
          clientEmail: client.clientEmail,
          message,
          lastMessage,
        });
      });
    });

    return chatData.sort(
      (a, b) => new Date(b.lastMessage.time) - new Date(a.lastMessage.time)
    );
  };

  useEffect(() => {
    const fetchProfilePics = async () => {
      const picPromises = chats.map(async (chat) => {
        const { name, profilePic } = await getProfilePic(chat.artistId);
        return { artistId: chat.artistId, name, profilePic };
      });

      const pics = await Promise.all(picPromises);
      const picMap = pics.reduce((acc, { artistId, name, profilePic }) => {
        acc[artistId] = { name, profilePic };
        return acc;
      }, {});

      setProfilePics(picMap);
    };

    fetchProfilePics();
  }, [chats]);

  return (
    <div className="flex h-dvh">
      <div
        className={`w-full md:w-1/3 ${
          selectedChat ? "hidden md:block" : "block"
        }`}
      >
        <ChatList
          setSelectedChat={setSelectedChat}
          chats={chats}
          profilePics={profilePics}
        />
      </div>
      <div
        className={`w-full md:w-2/3 ${
          selectedChat ? "block" : "hidden md:block"
        }`}
      >
        {selectedChat && (
          <ChatWindow
            selectedChat={selectedChat}
            handleBack={() => setSelectedChat(null)}
            profilePic={profilePics[selectedChat.artistId]?.profilePic}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
