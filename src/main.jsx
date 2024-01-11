import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/main.css";

import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/authContext";
import ThemeProvider from "./context/themeContext";
import QuizProvider from "./context/quizContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QuizProvider>
          <ThemeProvider>
            <Toaster />
            <App />
          </ThemeProvider>
        </QuizProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
