import React, { useState, useEffect } from 'react';
import { getExperiences } from '../utilities/ExperienceHandler';

const AddTrip = () => {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const response = await getExperiences({ user_id: 2 }); // TODO user id or other identfier to be fetched from browser based on auth 
            if (response.status) {
                setExperiences(response.data);
                console.log(experiences);
            } else {
                console.error('Error fetching experiences:', response.error);
            }
        } catch (error) {
            console.error('Error fetching experiences:', error);
        }
    };

    return (
    <div>
        <h1>Add Trip</h1>
    </div>
    )
}

export default AddTrip;