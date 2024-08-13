// export const API = "https://quizer.cycarts.com";

// export const API = "http://localhost:8080";
// export const API = "https://quizer-backendv2.vercel.app";
export const API = "https://api.sawal.co";
export const authApi = `${API}/api/auth`;
export const quizApi = `${API}/api/quiz`;
export const userApi = `${API}/api/user`;
export const questionApi = `${API}/api/question`;
export const attemptApi = `${API}/api/attempt`;
export const reportApi = `${API}/api/report`;
export const homeApi = `${API}/api/home`;
export const surveyApi = `${API}/api/survey`;

// 779716474567-ga0p4osg530hq2rg4vbqi8q4pi0ute41.apps.googleusercontent.com
// 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
// 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 open ai

export const toImageUrl = (filePath) => {
  return `${API}/${filePath.replace(/\\/g, "/")}`;
};
