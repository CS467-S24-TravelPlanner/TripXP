
function Experience({ experience }) {
    return (
        <tr>
            <td>{experience.title}</td>
            <td>{experience.description}</td>
            <td>{experience.location}</td>
            <td>{experience.rating}</td>
        </tr>
    );
};

export default Experience;