function StatCard({
  title,
  value,
  change,
  icon,
  positive
}) {

  return (
    <div className="stat-card">

      <div className="stat-top">

        <div>

          <p>
            {title}
          </p>

          <h2>
            {value}
          </h2>

        </div>


        <div className="stat-icon">

          <img
            src={icon}
            alt={title}
          />

        </div>

      </div>


      <div className="stat-bottom">

        <span
          className={
            positive
              ? "positive"
              : "negative"
          }
        >
          {positive ? "↑" : "↓"} {change}
        </span>

        <span>
          vs last month
        </span>

      </div>

    </div>
  );
}


export default StatCard;