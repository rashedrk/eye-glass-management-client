import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.ts";
import router from "./routes/router.tsx";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd";
import { theme } from "./theme/themeConfig";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConfigProvider theme={theme}>
          <Toaster />
          <RouterProvider router={router} />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
