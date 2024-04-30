import Experience from "./Experience";

function ExperienceList({ experiences }) {
  return (
    <div>
      <table style={{width: "800px",}}>
        {/* <caption>Experiences</caption> */}

        <thead style={{width: "800px",}}>
          <tr>
            <td style={{width: "25%",}}>Title</td>
            <td style={{width: "50%",}}>Description</td>
            <td style={{width: "15%",}}>Location</td>
            <td style={{width: "10%",}}>Rating</td>
          </tr>
        </thead>
        <div className="experience-list">
        <tbody>
          {experiences.map((experience, i) => (
            <Experience experience={experience} key={i} />
          ))}
        </tbody>
        </div>
      </table>
    </div>
  );
}

export default ExperienceList;
