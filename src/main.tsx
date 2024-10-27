import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/global.css";
import App from "./App.tsx";
import { ErrorProvider } from "./components/ErrorContext.tsx";

createRoot(document.getElementById("root")!).render(
	<ErrorProvider>
		<App />
	</ErrorProvider>
);
