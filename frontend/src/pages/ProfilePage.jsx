import React, { useState, useEffect } from 'react';
import userPicture from '../assets/user-solid.svg';
import { getTrips } from '../utilities/TripHandler';
import { getUsers } from '../utilities/UserHandler';

const ProfilePage = () => {
    const [trips, setTrips] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetchTrips();
    }, []);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchTrips = async () => {
        try {
            const response = await getTrips({ user_id: 2 }); // update once I have information from auth
            if (response.status) {
                setTrips(response.data);
            } else {
                console.error('Error fetching trips:', response.error);
            }
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    const fetchUser = async () => {
        try {
            const response = await getUsers({ id: 2 }); // update once I have information from auth
            if (response.status) {
                setUser(response.data);
            } else {
                console.error('Error fetching trips:', response.error);
            }
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    return (
    <div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '10px solid #ffffff' }}>
                <button>Back</button>
                <button>Add Trip</button>
            </div>

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <img src={userPicture} alt="User Picture" style={{ width: '200px', height: '200px',  borderRadius: '50%' }} />
            <div>
                {user.map(user => (
                    <div key ={user.id}>
                        <h3>{user.username}</h3>
                    </div>
                ))}
            </div>
        </div>

        <div style ={{ marginTop: '20px' }}>
            <h2>My Trips</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    {trips.map(trip => (
                        <div key={trip.id} style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '10px' }}>
                            <h3>{trip.name}</h3>
                            <p>{trip.description}</p>
                        </div>
                    ))}
            </div>
        </div>
    </div>
    )
}

export default ProfilePage;