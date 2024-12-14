const timePeriodsForIntervals = {
  TIME_PERIOD_FOR_INTERVAL_UNDER_60_SEC: ["Last 1 minute", "Last 5 minutes", "Last 15 minutes", "Last 30 minutes", "Last 1 hour", "Last 3 hours"],
  TIME_PERIOD_FOR_MIN_INTERVAL_60_SEC: ["Last 6 hours", "Last 12 hours", "Last 24 hours", "Last 2 days"],
  TIME_PERIOD_FOR_MIN_INTERVAL_300_SEC: ["Last 7 days", "Last 14 days", "Last 15 days", "Last 30 days"],
  TIME_PERIOD_FOR_MIN_INTERVAL_3600_SEC: ["Last 90 days"],
}

const timePeriods = {
  "Last 1 minute": 60,
  "Last 5 minutes": 300,
  "Last 15 minutes": 900,
  "Last 30 minutes": 1800,
  "Last 1 hour": 3600,
  "Last 3 hours": 10800,
  "Last 6 hours": 21600,
  "Last 12 hours": 43200,
  "Last 24 hours": 86400,
  "Last 2 days": 172800,
  "Last 7 days": 604800,
  "Last 14 days": 1209600,
  "Last 15 days": 1296000,
  "Last 30 days": 2592000,
  "Last 90 days": 7776000
}

const accumulatePeriods = (timePeriods, keys) =>
  keys.reduce((acc, key) => acc.concat(timePeriods[key]), []);

export const timePeriodIntervalMap = {
  INTERVAL_UNDER_60_SEC: timePeriodsForIntervals.TIME_PERIOD_FOR_INTERVAL_UNDER_60_SEC,
  INTERVAL_BETWEEN_60_TO_180_SEC: accumulatePeriods(timePeriodsForIntervals, [
    "TIME_PERIOD_FOR_INTERVAL_UNDER_60_SEC",
    "TIME_PERIOD_FOR_MIN_INTERVAL_60_SEC",
  ]),
  INTERVAL_BETWEEN_180_TO_300_SEC: accumulatePeriods(timePeriodsForIntervals, [
    "TIME_PERIOD_FOR_INTERVAL_UNDER_60_SEC",
    "TIME_PERIOD_FOR_MIN_INTERVAL_60_SEC",
    "TIME_PERIOD_FOR_MIN_INTERVAL_300_SEC",
  ]),
  INTERVAL_MORE_THAN_300_SEC: accumulatePeriods(timePeriodsForIntervals, [
    "TIME_PERIOD_FOR_INTERVAL_UNDER_60_SEC",
    "TIME_PERIOD_FOR_MIN_INTERVAL_60_SEC",
    "TIME_PERIOD_FOR_MIN_INTERVAL_300_SEC",
    "TIME_PERIOD_FOR_MIN_INTERVAL_3600_SEC",
  ])
}

// Removes all the timePeriods that are bigger the interval value
const removePeriodsSmallerThanInterval = (matchingPeriods, interval) => {
  return matchingPeriods.filter(key => timePeriods[key] > interval);
}

export const getTimePeriodsByInterval = (interval) => {
  if (interval === 0) return timePeriodIntervalMap.INTERVAL_MORE_THAN_300_SEC;

  let matchingPeriods;
  if (interval <= 60) {
    matchingPeriods = timePeriodIntervalMap.INTERVAL_UNDER_60_SEC;
  } else if (interval > 60 && interval < 180) {
    matchingPeriods = timePeriodIntervalMap.INTERVAL_BETWEEN_60_TO_180_SEC;
  } else if (interval >= 180 && interval < 300) {
    matchingPeriods = timePeriodIntervalMap.INTERVAL_BETWEEN_180_TO_300_SEC;
  } else {
    matchingPeriods = timePeriodIntervalMap.INTERVAL_MORE_THAN_300_SEC;
  }
  return matchingPeriods ? removePeriodsSmallerThanInterval(matchingPeriods, interval) : [];
};

export const getMinMaxIntervalByTimePeriod = (timePeriod) => {
  for (let key in timePeriodsForIntervals) {
    if (timePeriodsForIntervals[key].includes(timePeriod)) {
      switch (key) {
        case "TIME_PERIOD_FOR_INTERVAL_UNDER_60_SEC":
          return {min: 30, max: 59};
        case "TIME_PERIOD_FOR_MIN_INTERVAL_60_SEC":
          return {min: 60, max: timePeriods[timePeriod]};
        case "TIME_PERIOD_FOR_MIN_INTERVAL_300_SEC":
          return {min: 300, max: timePeriods[timePeriod]};
        case "TIME_PERIOD_FOR_MIN_INTERVAL_3600_SEC":
          return {min: 3600, max: Math.min(timePeriods[timePeriod], 86400)};
        default:
          return null;
      }
    }
  }
  return {min: 30, max: 86400}; // max period is 1 day
};


