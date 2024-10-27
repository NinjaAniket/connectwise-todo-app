import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "./ui/Table";
import TableCell from "./ui/Table/TableCell";
import TableRow from "./ui/Table/TableRow";

interface Todo {
	id: number;
	todo: string;
	completed: boolean;
	userId: number;
}

const TodoTable: React.FC<{ todos: Todo[] }> = ({ todos }) => {
	const navigate = useNavigate();

	if (!todos || todos.length === 0) {
		return <p>No todos available for this user.</p>;
	}

	const columns = ["Task ID", "Todo", "Completed", "User ID"];

	return (
		<div className='w-full text-center overflow-x-auto'>
			<Table columns={columns}>
				{todos.map((todo) => (
					<TableRow key={todo.id}>
						<TableCell>{todo.id}</TableCell>
						<TableCell>{todo.todo}</TableCell>
						<TableCell>{todo.completed ? "Yes" : "No"}</TableCell>
						<TableCell>
							<span
								onClick={() => navigate(`/users/${todo.userId}`)}
								className='text-blue-500 hover:underline cursor-pointer'
							>
								{todo.userId}
							</span>
						</TableCell>
					</TableRow>
				))}
			</Table>
		</div>
	);
};

export default TodoTable;
