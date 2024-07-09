import ReactDOM from "react-dom/client";

import { BrowserRouter, HashRouter } from "react-router-dom";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/main.css";


import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/authContext";


import {

  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ConfigProvider } from "antd";
import { SrvyContextProvider } from "./context/srvyContext";
// import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")).render(

  <BrowserRouter>
    <QueryClientProvider client={queryClient}>



      {/* <GoogleOAuthProvider
      clientId={`779716474567-ga0p4osg530hq2rg4vbqi8q4pi0ute41.apps.googleusercontent.com`}> */}

      <AuthProvider>
        <SrvyContextProvider>
          <ConfigProvider
            theme={{
              Menu: {
                dangerItemSelectedBg: "#ff4d4f"
                /* here is your component tokens */
              },
            }}
          >
            <Toaster />
            <App />
          </ConfigProvider>
        </SrvyContextProvider>
      </AuthProvider>
      {/* </GoogleOAuthProvider> */}

    </QueryClientProvider>
  </BrowserRouter>
);
