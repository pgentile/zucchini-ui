import React, { memo } from "react";
import PropTypes from "prop-types";
import ProgressBar from "react-bootstrap/ProgressBar";
import Status from "../../ui/components/Status";

function StatsProgressBar({ stats }) {
  const bars = [
    {
      statName: "passed",
      status: "PASSED",
      variant: "success"
    },
    {
      statName: "pending",
      status: "PENDING",
      variant: "warning"
    },
    {
      statName: "failed",
      status: "FAILED",
      variant: "danger"
    },
    {
      statName: "notRun",
      status: "NOT_RUN",
      variant: "dark"
    }
  ];

  const progressBars = bars
    .map((bar) => {
      const value = stats[bar.statName];
      return { ...bar, value };
    })
    .filter(({ value }) => value > 0)
    .map(({ statName, variant, value }) => {
      const valueInPercent = (value / stats.count) * 100;
      const label = `${Math.round(valueInPercent)}%`;
      return (
        <ProgressBar key={statName} variant={variant} now={valueInPercent} label={label} srOnly={valueInPercent < 20} />
      );
    });

  const listItems = bars.map(({ statName, status }) => {
    return (
      <li key={statName} className="list-inline-item">
        <Status status={status} />
      </li>
    );
  });

  return (
    <>
      <ProgressBar className="mb-3">{progressBars}</ProgressBar>
      <ul className="list-inline">{listItems}</ul>
    </>
  );
}

StatsProgressBar.propTypes = {
  stats: PropTypes.object.isRequired
};

export default memo(StatsProgressBar);
