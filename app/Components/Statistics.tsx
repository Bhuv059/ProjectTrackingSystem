interface StatisticsProps {
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
}: StatisticsProps) {
  const progress =
    projectsLength > 0 ? (projectsCompleted / projectsLength) * 100 : 0;

  return (
    <section className="statistics">
      <div className="statistics-content">
        {/* Total project value */}
        <div>
          <p className="statistics-label">Total project value</p>

          <p className="statistics-value">
            {`$${totalProjectValue.toLocaleString()}`}
          </p>

          <div className="statistics-status">
            <span className="statistics-dot" />

            <p className="statistics-status-text">
              Across {projectsLength} active projects
            </p>
          </div>
        </div>

        {/* Delivery statistics */}
        <div className="delivery-statistics">
          <div
            className="delivery-circle"
            style={{
              background: `conic-gradient(#0d9488 ${progress}%, #e2e8f0 0)`,
            }}
          >
            <div className="delivery-circle-inner">
              <span className="delivery-count">
                {projectsCompleted}/{projectsLength}
              </span>
            </div>
          </div>

          <div>
            <p className="delivery-title">Projects delivered</p>

            <p className="delivery-description">
              {projectsCompleted} complete, {projectsInProgress} in progress
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
