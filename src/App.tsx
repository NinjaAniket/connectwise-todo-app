import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDetailPage from "./components/UserDetailPage";
import "./App.css";

import TodosPage from "./pages/TodoPage";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<TodosPage />} />
				<Route path='/users/:userId' element={<UserDetailPage />} />
			</Routes>
		</Router>
	);
};

export default App;
