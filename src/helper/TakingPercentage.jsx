export function percentage(num, per) {
  return (num / per) * 100;
}


export function convertScoreToGrade(percentage, totalQuestions) {
  if (totalQuestions === 0) return "N/A"; // Handle division by zero

  // let percentage = (score / totalQuestions) * 100;

  if (percentage >= 90) {
    return "A";
  } else if (percentage >= 80) {
    return "B";
  } else if (percentage >= 70) {
    return "C";
  } else if (percentage >= 60) {
    return "D";
  } else {
    return "F";
  }
}
