export const API = "https://api.sawal.co";
export const authApi = `${API}/api/auth`;
export const quizApi = `${API}/api/quiz`;
export const userApi = `${API}/api/user`;
export const questionApi = `${API}/api/question`;
export const attemptApi = `${API}/api/attempt`;
export const reportApi = `${API}/api/report`;
export const homeApi = `${API}/api/home`;
export const surveyApi = `${API}/api/survey`;

export const toImageUrl = (filePath) => {
  return `${API}/${filePath.replace(/\\/g, "/")}`;
};
