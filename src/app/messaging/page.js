'use client'
import { useState } from "react";
import { UserAuth } from "../context/AuthContext.js";
import { saveMessagingDeviceToken } from "../firebase/messaging";
import { useNotifications } from "../hooks/useNotifications";
import { useTokens } from "../hooks/useTokens";
import TopBar from '../UI/TopBar.jsx';
import Image from "next/image.js";
import '../../styles/BgTopBar.css';
import "./messaging.css"; // Import CSS

export default function ChatPage() {
  const {
    user, authLoading, authError,
    userSignIn, userSignUp,
    googleSignIn,
    userSignOut
  } = UserAuth();
  const USER_ID = user?.uid;

  const { saveToken, fetchToken } = useTokens();
  const { sendNotification } = useNotifications();

  const [messages, setMessages] = useState([
    { id: 1, text: "Hey guys, I just made a new playlist!", sender: "user1" },
    { id: 2, text: "I'll definitely give it an ear later!", sender: "user2" },
    { id: 3, text: "Sounds good!", sender: "user1" },
    { id: 4, text: "Does anyone want to hit legs tonight?", sender: "user1" },
    { id: 5, text: "Chest.", sender: "user3" },
    { id: 6, text: "Tuesday is back day.", sender: "user2" },
    { id: 7, text: "I said legs.", sender: "user1" },
    { id: 8, text: "Back only.", sender: "user2" },
    { id: 9, text: "Chest.", sender: "user3" },
    { id: 10, text: "Legs.", sender: "user1" },
    { id: 11, text: "Legs.", sender: "user1" },
    { id: 12, text: "Legs.", sender: "user1" },
    { id: 13, text: "Legs.", sender: "user1" },
    { id: 14, text: "Back.", sender: "user2" },
    { id: 15, text: "Legs.", sender: "user1" },
    { id: 16, text: "Chest.", sender: "user3" },
    { id: 17, text: "Legs.", sender: "user1" },
    { id: 18, text: "Legs.", sender: "user1" },
    { id: 19, text: "Legs.", sender: "user1" },
  ]);

  const handleTestNotification = async () => {
    const permission = await saveMessagingDeviceToken(USER_ID);
    if (permission) {
      const token = await fetchToken(USER_ID);
      if (token) sendNotification(token);
    }
  };

  return (
    <div className="app">
      <TopBar loggedIn={Boolean(user)} onProfileClick={userSignOut} />

      <div className="grid-container">

        {/* Icons */}
        <div className="grid-item icon-column">
          <Image className="profile-icon"
            src="/assets/UserProfile.png"
            height="50" width="50" alt='Profile' />
          <Image className="profile-icon"
            src="/assets/UserProfile.png"
            height="50" width="50" alt='Profile' />
          <Image className="profile-icon"
            src="/assets/UserProfile.png"
            height="50" width="50" alt='Profile' />
          <Image className="profile-icon"
            src="/assets/UserProfile.png"
            height="50" width="50" alt='Profile' />
        </div>

        {/* Friend Groups */}
        <div className="grid-item channel-column">

          <div className="friend-groups-image-container">
            <Image className='friend-groups-image'
              src="/assets/friend-groups.png" alt="menu-icon"
              width="300" height="175" />
            <h2 className="friend-groups-title">Friend Groups</h2>
          </div>

          <input type="text" placeholder="Search..." className="search-bar" />


          <div className="channel-list">
            <h2>Channels</h2>
            <button className="channel-button">The Homies</button>
            <button className="channel-button">Daily Chat</button>
            <button className="channel-button">Discussion</button>
            <button className="channel-button">Airdrops</button>
            <button className="channel-button">Gym Bros</button>
            <button className="channel-button">Bowling Lads</button>
          </div>

        </div>

        {/* Chat Area */}
        <div className="grid-item chat-column">
          <span className="chat-header">Gymrat Group Chat</span>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender === "user1" ? 'my-message' : 'other-message'}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="message-input-container">
            <input type="text" placeholder="Message..." className="message-input" />
            <button className="send-button">Send</button>
          </div>
        </div>

        {/* Notification Button */}
        <button
          onClick={handleTestNotification}
          className="notification-button"
          disabled={!USER_ID}
        >
          Test Notification
        </button>

      </div>

    </div>
  );
}