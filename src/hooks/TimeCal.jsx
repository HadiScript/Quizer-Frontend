import moment from "moment";

export function TimeCal(startTime, endTime) {
  const start = moment(startTime);
  const end = moment(endTime);

  const duration = moment.duration(end.diff(start));

  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return `${minutes}m ${seconds}s`;
}
