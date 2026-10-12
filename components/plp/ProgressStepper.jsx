export function ProgressStepper({ steps, stepCompletion, activeStep }) {
  const completedCount = stepCompletion.filter(Boolean).length;

  return (
    <nav className="plp-stepper" aria-label="Property listing progress">
      <div className="plp-stepper-track">
        {steps.map((step, index) => {
          const isComplete = stepCompletion[index];
          const isActive = index === activeStep;

          return (
            <div
              className={`plp-step ${isComplete ? "is-complete" : ""} ${isActive ? "is-active" : ""}`}
              key={step}
            >
              {index < steps.length - 1 && (
                <span
                  className={`plp-step-line ${index < completedCount ? "is-complete" : ""}`}
                />
              )}
              <span className="plp-step-circle">{isComplete ? "✓" : ""}</span>
              <span className="plp-step-label">{step}</span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
