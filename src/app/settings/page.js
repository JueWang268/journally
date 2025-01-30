"use client";
import React, { useState, useEffect } from "react";
import "../../styles/Settings.css";
import useUsers from "../hooks/useUsers.js";
import TopBar from "../UI/TopBar.jsx";
import { UserAuth } from '../context/AuthContext';

const TABS = ["Account", "Notifications", "Privacy", "Appearance", "Preferences", "Subscription"];

export default function SettingsPage() {
    const { user } = UserAuth();
    const userId = user?.uid;
    const { getUserByID, editUser } = useUsers();

    const [selectedTab, setSelectedTab] = useState("Account");
    const [settings, setSettings] = useState(null);
    const [localSettings, setLocalSettings] = useState(settings);
    const [editingField, setEditingField] = useState(null);
    
    useEffect(() => {
        if (userId) {
            const fetchData = async () => {
                try {
                    const fetchedUser = await getUserByID(userId);
                    if (fetchedUser?.settings) {
                        setSettings(fetchedUser.settings);
                        setLocalSettings(fetchedUser.settings);
                    }
                } catch (err) {
                    console.error("Error fetching user settings:", err);
                }
            };
            fetchData();
        }
    }, [userId]);

    const ACCOUNT_LABELS = {
        profileImg: "Profile Image",
        name: "Name",
        birth: "Date of Birth",
        gender: "Gender",
        email: "Email",
        phone: "Phone Number",
    };

    const NOTIF_LABELS = {
        email: "Email",
        sms: "SMS",
        push: "Push Notifications",
    };

    const handleInputChange = (field, value) => {
        setLocalSettings((prev) => ({
            ...prev,
            account: {
                ...prev.account,
                [field]: value,
            },
        }));
    };

    const toggleNotification = (field) => {
        setLocalSettings((prev) => ({
            ...prev,
            notification: {
                ...prev.notification,
                [field]: !prev.notification[field],
            },
        }));
    };

    const handleUpdateSettings = async () => {
        try {
            await editUser(userId, localSettings);
            setSettings(localSettings);
            console.log("Settings updated successfully!");
        } catch (err) {
            console.error("Error updating settings:", err);
        }
    };
    
    const ACCOUNT_ORDER = ["profileImg", "name", "birth", "gender", "email", "phone"];
    const NOTIF_ORDER = ["email", "sms", "push"];

    const renderAccountFields = () =>
        ACCOUNT_ORDER.map((field) => (
            <div className="form-group" key={field}>
                <label>{ACCOUNT_LABELS[field]}</label>
                {field === "profileImg" ? (
                    <div className="profile-image-container">
                        <img
                            src={localSettings?.account?.[field]}
                            alt="Profile"
                            className="profile-image"
                        />
                    </div>
                ) : editingField === field ? (
                    <input
                        type="text"
                        value={localSettings.account[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        onBlur={() => setEditingField(null)}
                        onKeyDown={(e) => e.key === "Enter" && setEditingField(null)}
                    />
                ) : (
                    <span
                        onClick={() => setEditingField(field)}
                        className="editable-text"
                    >
                        {localSettings?.account?.[field]}
                    </span>
                )}
            </div>
        ));

    const renderNotificationSettings = () =>
        NOTIF_ORDER.map((setting) => (
            <div className="notifications-form-group" key={setting}>
                <label>{NOTIF_LABELS[setting]}</label>
                <div className="view-switch">
                    <div
                        className={`slider ${localSettings.notification[setting] ? "right" : "left"}`}
                        onClick={() => toggleNotification(setting)}
                    >
                        <span className="slider-text">
                            {localSettings.notification[setting] ? "On" : "Off"}
                        </span>
                        <div className="slider-button"></div>
                    </div>
                </div>
            </div>
        ));
    
    const renderContent = () => {
        switch (selectedTab) {
            case "Account":
                return (
                    <div className="account-container">
                        <p>Account</p>
                        <div className="account-content">
                            <p>Basic Info</p>
                            <div className="content-list">{renderAccountFields()}</div>
                        </div>
                    </div>
                );
            case "Notifications":
                return (
                    <div className="notifications-container">
                        <p>Notifications</p>
                        <div className="notifications-content">
                            <p>Preferences</p>
                            <div className="notifications-content-list">
                                {renderNotificationSettings()}
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div>Select a tab to view its settings</div>;
        }
    };

    return (
        <div className="app">
            <TopBar />
            <div className="home-container">
                <div className="content-box">
                    <div className="content-grid">
                        <div className="side-bar">
                            <p>Settings</p>
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
                        <div className="content">
                            {renderContent()}
                            <div className="button-container">
                                <button className="update-button" onClick={handleUpdateSettings}>
                                    Update Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

