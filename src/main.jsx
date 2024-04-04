import ReactDOM from "react-dom/client";

import { HashRouter } from "react-router-dom";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/main.css";
// import './assets/ui/aos.css'
import './assets/ui/style.min.css'
import './assets/ui/swiper.min.css'


import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/authContext";


import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <GoogleOAuthProvider
      clientId={`779716474567-ga0p4osg530hq2rg4vbqi8q4pi0ute41.apps.googleusercontent.com`}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster />
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </HashRouter>
);
