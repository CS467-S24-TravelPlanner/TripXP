
function Experience({ experience }) {
    return (
        <tr className="experience-item">
            <td style={{width: "25%"}}>{experience.title}</td>
            <td style={{width: "50%"}}>{experience.description}</td>
            <td style={{width: "15%"}}>{experience.location}</td>
            <td style={{width: "10%"}}>{experience.rating}</td>
        </tr>
    );
};

export default Experience;