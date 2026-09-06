import Intro from "./Intro";
import Projects from "./Projects";
import Statistics from "./Statistics";
import {
  projects,
  completed,
  totalAll,
  getFilteredProjects,
} from "../data/index";
export default function Dashboard() {
  const totalProjectValue = totalAll;
  const projectsCompleted = completed;

  return (
    <section>
      <div className="mx-auto max-w-6xl">
        <Intro />

        <Statistics
          totalProjectValue={totalProjectValue}
          projectsCompleted={projectsCompleted}
          projectsInProgress={
            getFilteredProjects(projects, "In Progress").length
          }
          projectsLength={projects.length}
        />
      </div>
      <br></br>
      <div>
        <Projects />
      </div>
    </section>
  );
}
