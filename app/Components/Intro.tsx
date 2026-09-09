"use client";

import { useRouter } from "next/navigation";

export default function Intro() {
  const router = useRouter();

  const handleNewProject = () => {
    router.push("/projects/new");
  };

  return (
    <section className="intro">
      <div>
        <h1 className="intro-title">Project Tracker</h1>

        <p className="intro-description">
          Keep track of every project, from first brief to final delivery.
        </p>
      </div>

      <button
        type="button"
        onClick={handleNewProject}
        className="new-project-button"
      >
        <span className="text-lg leading-none">+</span>
        <span>New project</span>
      </button>
    </section>
  );
}
