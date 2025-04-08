"use client";
import { useState } from "react";
import TopBar from "../UI/TopBar.jsx";
import MobileNavBar from "../UI/MobileNavBar.jsx";
import Image from "next/image";
import { UserAuth } from "../context/AuthContext.js";
import { saveMessagingDeviceToken } from "../firebase/messaging";
import { useNotifications } from "../hooks/useNotifications";
import { useTokens } from "../hooks/useTokens";
import "../../styles/BgTopBar.css";
import "./Messaging.css";

export default function ChatPage() {
  const { user, userSignOut } = UserAuth();
  const USER_ID = user?.uid;

  const { fetchToken } = useTokens();
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

  const [profiles, setProfiles] = useState([
    { id: 1, src: "/assets/UserProfile.png", alt: "Profile" },
    { id: 2, src: "/assets/UserProfile.png", alt: "Profile" },
    { id: 3, src: "/assets/UserProfile.png", alt: "Profile" },
    { id: 4, src: "/assets/UserProfile.png", alt: "Profile" },
  ]);

  const [channels, setChannels] = useState([
    { id: 1, name: "The Homies" },
    { id: 2, name: "Daily Chat" },
    { id: 3, name: "Discussion" },
    { id: 4, name: "Airdrops" },
    { id: 5, name: "Gym Bros" },
    { id: 6, name: "Bowling Lads" },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTestNotification = async () => {
    const permission = await saveMessagingDeviceToken(USER_ID);
    if (permission) {
      const token = await fetchToken(USER_ID);
      if (token) sendNotification(token);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const SidebarContent = () => (
    <div className="sidebar-content">
      <MobileNavBar loggedIn={Boolean(user)} onProfileClick={userSignOut} />
      <div className="sidebar-section horizontal-list">
        {profiles.map((profile) => (
          <div className="profile-icon-container" key={profile.id}>
            <Image
              className="profile-icon"
              src={profile.src}
              width={40}
              height={40}
              alt={profile.alt}
            />
          </div>
        ))}
      </div>
      <div className="sidebar-section">
        <div className="channel-list">
          {channels.map((channel) => (
            <button key={channel.id} className="channel-button">
              {channel.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      {/* TopBar */}
      <div className="desktop-topbar">
        <TopBar loggedIn={Boolean(user)} onProfileClick={userSignOut} />
      </div>

      {/* Sidebar Access */}
      <div className="mobile-hamburger" onClick={toggleSidebar}>
        &#9776;
      </div>

      {/* Desktop */}
      <div className="main-content">
        <div className="grid-container">
          {/* Profile icons */}
          <div className="grid-item icon-column">
            {profiles.map((profile) => (
              <div className="profile-icon-container" key={profile.id}>
                <Image
                  className="profile-icon"
                  src={profile.src}
                  width={50}
                  height={50}
                  alt={profile.alt}
                />
              </div>
            ))}
          </div>

          {/* Friend groups & channels */}
          <div className="grid-item channel-column">
            <div className="friend-groups-image-container">
              <Image
                className="friend-groups-image"
                src="/assets/friend-groups.png"
                alt="menu-icon"
                draggable="false"
                width={300}
                height={200}
              />
            </div>
            <input type="text" placeholder="Search..." className="search-bar" />
            <div className="channel-list">
              {channels.map((channel) => (
                <button key={channel.id} className="channel-button">
                  {channel.name}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Column */}
          <div className="grid-item chat-column">
            <div className="chat-header-container">
              <span className="chat-header">Gymrat Group Chat</span>
              <button
                onClick={handleTestNotification}
                className="notification-button"
              >
                🔔
              </button>
            </div>

            <div className="chat-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender === "user1" ? "my-message" : "other-message"
                    }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="message-input-container">
              <input
                type="text"
                placeholder="Message..."
                className="message-input"
              />
              <button className="send-button">Send</button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <button className="close-sidebar" onClick={toggleSidebar}>
            &times;
          </button>
        </div>
        <SidebarContent />
      </div>
    </div>
  );
}