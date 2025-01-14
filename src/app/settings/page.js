"use client"
import React, { useState, useEffect } from 'react';
import '../../styles/Settings.css';
import TopBar from '../UI/TopBar.jsx';
import Image from 'next/image';

const TABS = ["Account", "Notifications", "Privacy", "Appearance", "Preferences", "Subscription"];
export default function SettingsPage() {
    
    const [selectedTab, setSelectedTab] = useState();
    const [accountInfo, setAccountInfo] = useState({
        profileImg: "/assets/UserProfile.png", 
        name: "John Doe",
        birth: "November 15, 2024",
        gender: "Male",
        email: "john.doe@gmail.com",
        phone: "(123) 456-7890",
    });
    const ACCOUNT_LABELS = {
        profileImg: "Profile Image",
        name: "Name",
        birth: "Date of Birth",
        gender: "Gender",
        email: "Email",
        phone: "Phone Number",
    }

    const [notifInfo, setNotifInfo] = useState({
        email: false,
        sms: false,
        push: false,
    });
    const NOTIF_LABELS = {
        email: "Email",
        sms: "SMS",
        push: "Push Notifications",
    }

    const [editingField, setEditingField] = useState(null);

    const toggleNotification = (field) => {
        setNotifInfo((prevSettings) => ({
            ...prevSettings,
            [field]: !prevSettings[field],
        }));
    };
    
    const handleInputChange = (field, value) => {
        setAccountInfo((prevInfo) => ({
            ...prevInfo,
            [field]: value,
        }));
    };

    const handleKeyDown = (e, field) => {
        if (e.key === "Enter"){
            setEditingField(null);
        }
    };

    const renderAccountFields = () =>
        Object.keys(accountInfo).map((field) => (
            <div className="form-group" key={field}>
                <label>{ACCOUNT_LABELS[field]}</label>
                {field === "profileImg" ? (
                    <div className="profile-image-container">
                        <img
                            src={accountInfo[field]}
                            alt="Profile"
                            className="profile-image"
                        />
                    </div>
                ) : editingField === field ? (
                    <input
                        type="text"
                        value={accountInfo[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        onBlur={() => setEditingField(null)}
                        onKeyDown={(e) => handleKeyDown(e, field)}
                    />
                ) : (
                    <span
                        onClick={() => setEditingField(field)}
                        className="editable-text"
                    >
                        {accountInfo[field]}
                    </span>
                )}
            </div>
        ));
    
    const renderNotificationSettings = () =>
        Object.keys(notifInfo).map((setting) => (
            <div className="notifications-form-group" key={setting}>
                <label>{NOTIF_LABELS[setting]}</label>
                <div className="view-switch">
                    <div
                        className={`slider ${notifInfo[setting] ? 'right' : 'left'}`}
                        onClick={() => toggleNotification(setting)}
                    >
                        <span className="slider-text">{notifInfo[setting] ? 'On' : 'Off'}</span>
                        <div className="slider-button"></div>
                    </div>
                </div>
            </div>
        ));

    const renderContent = () => {
        switch (selectedTab){
            case "Account":
                return (
                    <div className='account-container'>
                        <p>Account</p>
                        <div className='account-content'>
                            <p>Basic Info</p>
                            <div className='content-list'>
                                {renderAccountFields()}
                            </div>
                        </div>
                    </div>
                );
            case "Notifications":
                return (
                    <div className='notifications-container'>
                        <p>Notifications</p>
                        <div className='notifications-content'>
                            <p>Preferences</p>
                            <div className='notifications-content-list'>
                                {renderNotificationSettings()}
                            </div>
                        </div>
                    </div>
                );
            case "Privacy":
                return <div><h1>Privacy</h1></div>;
            case "Appearance":
                return <div><h1>Appearance</h1></div>;
            case "Preferences":
                return <div><h1>Preferences</h1></div>;
            case "Subscription":
                return <div><h1>Subscription</h1></div>;
            default:
                return <div>Select a tab to view its settings</div>;
        }
    };

    return (
      <div className='app'>
        <TopBar />

        <div className='home-container'>
            <div className='content-box'>
                <div className='content-grid'>
                    <div className='side-bar'>
                        <p>
                            Settings
                        </p>
                        <ul>
                            {TABS.map((tab) => (
                                <li
                                    key={tab}
                                    className={`nav-pill ${selectedTab === tab ? "selected" : ""}`}
                                    onClick={() => setSelectedTab(tab)}
                                >
                                    {tab}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='content'>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  