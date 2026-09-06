interface statisticsProps {
  totalProjectValue: number;
  projectsCompleted: number;
  projectsInProgress: number;
  projectsLength: number;
}

export default function Statistics({
  totalProjectValue,
  projectsCompleted,
  projectsInProgress,
  projectsLength,
}: statisticsProps) {
  const progress =
    projectsLength > 0 ? (projectsCompleted / projectsLength) * 100 : 0;

  return (
    <section className="mt-8 border border-teal-600/50 bg-white p-6">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        {/* Total project value */}
        <div>
          <p className="text-xs font-medium text-slate-700">
            Total project value
          </p>

          <p className="mt-1 text-3xl font-normal text-teal-700 sm:text-4xl">
            {`$${totalProjectValue.toLocaleString()}`}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />

            <p className="text-xs text-slate-600">
              Across {projectsLength} active projects
            </p>
          </div>
        </div>

        {/* Delivery statistics */}
        <div className="flex items-center gap-4">
          {/* Circle */}
          <div
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(#0d9488 ${progress}%, #e2e8f0 0)`,
            }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
              <span className="text-xs font-medium text-teal-800">
                {projectsCompleted}/{projectsLength}
              </span>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-medium text-teal-700">
              Projects delivered
            </p>

            <p className="mt-1 text-xs text-slate-600">
              {projectsCompleted} complete, {projectsInProgress} in progress
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
