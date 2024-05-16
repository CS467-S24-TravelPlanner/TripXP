import { React, useState, useEffect } from 'react';
import ExperienceForm from '../components/ExperienceForm';
import { createExperience } from '../utilities/ExperienceHandler';



function AddExperience() {

    const [experience, setExperience] = useState(null);
    const [inputData, setInputData] = useState(null);
    const [expId, setExpId] = useState(null);

    function handleSubmit(e) {
        e.preventDefault()
        const formData = {
            title: e.target.titleInput.value,
            description: e.target.descriptionInput.value,
            location: e.target.locationInput.value,
            keywords: e.target.keywordsInput.value
        }
        console.log(formData)
    }


    // useEffect(() => {
    //     console.log('hook')
    // }, [])

    return (
        <div>
            <ExperienceForm handleSubmit={handleSubmit} />
        </div>
    )
}

export default AddExperience;