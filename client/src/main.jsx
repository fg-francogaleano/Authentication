import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AppMui from "./MUI/AppMui.jsx";
import { Provider } from "./Context/Context.jsx";
import { BrowserRouter } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <AppMui>
          <App />
        </AppMui>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
