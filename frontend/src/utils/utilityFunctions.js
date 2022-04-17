export function validateDates(startYear, startMonth, endYear, endMonth) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  if (startYear > currentYear) {
    return "Start Date can't be in the future";
  } else if (startYear == currentYear) {
    if (months.indexOf(startMonth) > currentMonth) {
      return "Start Date can't be in the future";
    }
  }
  if (endYear) {
    if (startYear > endYear) {
      return "End date can't be earlier than start date";
    } else if (startYear == endYear) {
      if (months.indexOf(startMonth) > months.indexOf(endMonth)) {
        return "End date can't be earlier than start date";
      }
    }
  }

  return "";
}
