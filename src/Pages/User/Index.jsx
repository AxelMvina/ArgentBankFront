import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BankAccount } from "../../Components/BankAccount";
import { updateUserProfile } from '../../Redux/slices/UserSlice';

export function UserPage() {
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token); 
    const dispatch = useDispatch(); 

    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(user?.username || ""); // Default to an empty string if user.username is undefined
    const [error, setError] = useState(null);

    // Update the username state when user data changes
    useEffect(() => {
        setUsername(user?.username || "");
    }, [user]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify({ userName: username }),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(updateUserProfile(data.body)); // Dispatch only on success
                setIsEditing(false);
                setError(null); // Clear any previous errors
            } else {
                if (response.status === 400) {
                    setError("Invalid fields. Please check the input.");
                } else if (response.status === 500) {
                    setError("Internal Server Error. Please try again later.");
                } else {
                    setError("An unexpected error occurred. Please try again.");
                }
            }
        } catch (error) {
            setError("An unexpected error occurred. Please check your network and try again.");
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setUsername(user?.username || ""); // Reset username to its original value or empty string
        setError(null); // Clear any errors
    };

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{user?.firstName || ""} {user?.lastName || ""}</h1>
                {!isEditing && (
                    <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
                )}
                {isEditing && (
                    <div className="edit-form">
                        <label>
                            Username:
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <label>
                            First Name:
                            <input type="text" value={user?.firstName || ""} readOnly className="formReadOnly" />
                        </label>
                        <label>
                            Last Name:
                            <input type="text" value={user?.lastName || ""} readOnly className="formReadOnly" />
                        </label>
                        <div className="button-group">
                            <button 
                            className="save-button" 
                            onClick={handleSaveClick}
                            disabled={!username.trim()}>Save</button>
                            <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <BankAccount title="Argent Bank Checking (x8349)" p="$2,082.79" pDesc="Available Balance" />
            <BankAccount title="Argent Bank Savings (x6712)" p="$10,928.42" pDesc="Available Balance" />
            <BankAccount title="Argent Bank Credit Card (x8349)" p="$184.30" pDesc="Current Balance" />
        </main>
    );
}
