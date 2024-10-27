import React, { useEffect, useState } from "react";
import { fetchUsers } from "../service";
import Loader from "./ui/Loader";
import Button from "./ui/Button";
import { useError } from "./ErrorContext";

interface User {
	id: number;
	firstName: string;
	lastName: string;
}

const UserDropdown: React.FC<{ onUserSelect: (userId: number) => void }> = ({
	onUserSelect,
}) => {
	const [users, setUsers] = useState<User[]>([]);
	const [selectedUser, setSelectedUser] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const { error, setError } = useError();

	useEffect(() => {
		setError(null);
		const fetchUserData = async () => {
			try {
				const response = await fetchUsers();
				setUsers(response.data.users);
			} catch (error) {
				setError("Failed to fetch users. Please try again later.");
				console.error("Error fetching users:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, [setError]);

	const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedUser(parseInt(e.target.value));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (selectedUser) {
			onUserSelect(selectedUser);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-row w-full space-x-4 items-center mb-4'
		>
			{error && <p className='text-red-500'>{error}</p>}
			{loading ? (
				<div className='flex-grow text-center'>
					<Loader />
				</div>
			) : (
				<>
					<select
						onChange={handleUserChange}
						value={selectedUser || ""}
						className='flex-grow border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
					>
						<option value=''>Select a User</option>
						{users.map((user) => (
							<option key={user.id} value={user.id}>
								{user.firstName} {user.lastName}
							</option>
						))}
					</select>
					<Button type='submit' className='w-32'>
						Search
					</Button>
				</>
			)}
		</form>
	);
};

export default UserDropdown;
