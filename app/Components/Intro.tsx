export default function Intro() {
  return (
    <section className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-4xl text-pink-100 font-normal tracking-tight sm:text-5xl">
          Freelance Projects
        </h1>
        <p className="mt-3 text-sm text-gray-400 sm:text-base">
          Keep track of every project, from first brief to final delivery.
        </p>
      </div>

      <button
        type="button"
        className="flex w-fit items-center gap-2 rounded-md bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-teal-800"
      >
        <span className="text-lg leading-none">+</span>
        <span>New project</span>
      </button>
    </section>
  );
}
