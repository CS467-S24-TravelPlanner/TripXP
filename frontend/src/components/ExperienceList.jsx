import Experience from "./Experience";

function ExperienceList({ experiences }) {
  return (
    <table className="experience-list">
      <caption>Experiences</caption>

      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Location</th>
          <th>Rating</th>
        </tr>
      </thead>

      <tbody>
        {experiences.map((experience, i) => 
          <Experience experience={experience} key={i}/>
        )}
      </tbody>
    </table>
  );
}

export default ExperienceList;
