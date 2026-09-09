import Intro from "./Intro";
import Projects from "./projects/Projects";
import Statistics from "./Statistics";
import { projects } from "@/app/data/projects";
import { completed, totalAll, getFilteredProjects } from "@/app/types/index";

export default function Dashboard() {
  const totalProjectValue = totalAll;
  const projectsCompleted = completed;

  return (
    <section>
      <div className="dashboard-container">
        <Intro />

        <Statistics
          totalProjectValue={totalProjectValue}
          projectsCompleted={projectsCompleted}
          projectsInProgress={
            getFilteredProjects(projects, "In Progress").length
          }
          projectsLength={projects.length}
        />
        <Projects projectpage="All" />
      </div>
    </section>
  );
}
