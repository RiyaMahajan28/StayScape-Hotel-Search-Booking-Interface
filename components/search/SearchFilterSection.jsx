export function SearchFilterSection({
  title,
  expanded,
  onToggle,
  onReset,
  className,
  children,
}) {
  return (
    <div className={`search-filter-section ${className ?? ""} ${expanded ? "is-open" : ""}`}>
      <div className="search-filter-header">
        <button type="button" className="search-filter-trigger" onClick={onToggle}>
          <span>{title}</span>
          <span className="search-filter-arrow" aria-hidden="true" />
        </button>
        {onReset ? (
          <button type="button" className="search-filter-clear" onClick={onReset}>
            Clear
          </button>
        ) : null}
      </div>
      {expanded && <div className="search-filter-body">{children}</div>}
    </div>
  );
}
