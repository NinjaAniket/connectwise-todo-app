import React, { useState, useEffect } from "react";
import UserDropdown from "../components/UserDropdown";
import TodoTable from "../components/TodoTable";
import Pagination from "../components/Pagination";
import { fetchTodos, fetchTodosByUser } from "../service";
import Loader from "../components/ui/Loader";
import { useError } from "../components/ErrorContext";

const TodosPage: React.FC = () => {
	const [todos, setTodos] = useState([]);
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
	const [page, setPage] = useState(1);
	const [limit] = useState(10);
	const [totalTodos, setTotalTodos] = useState(0);
	const [loading, setLoading] = useState(true);
	const { error, setError } = useError();

	useEffect(() => {
		const fetchData = async () => {
			const skip = (page - 1) * limit;
			setLoading(true);
			setError(null);

			try {
				let response;
				if (selectedUserId) {
					response = await fetchTodosByUser(selectedUserId);
				} else {
					response = await fetchTodos(limit, skip);
				}
				setTodos(response.data.todos);
				setTotalTodos(response.data.total);
			} catch (err) {
				setError("Failed to fetch todos. Please try again later.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [page, selectedUserId, limit, setError]);

	const handleUserSelect = (userId: number | null) => {
		setSelectedUserId(userId);
		setPage(1);
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	return (
		<div className='flex flex-col justify-center items-center h-screen'>
			<div className='w-full max-w-4xl'>
				<UserDropdown onUserSelect={handleUserSelect} />
				{loading ? (
					<Loader />
				) : error ? (
					<p className='text-red-500 text-center'>{error}</p>
				) : (
					<>
						<TodoTable todos={todos} />
						<Pagination
							totalItems={totalTodos}
							itemsPerPage={limit}
							currentPage={page}
							onPageChange={handlePageChange}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default TodosPage;
