import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserDetails } from "../service";
import Loader from "./ui/Loader";
import Button from "./ui/Button";
import { useError } from "./ErrorContext";

interface UserDetails {
	id: number;
	firstName: string;
	lastName: string;
	role: string;
	image: string;
}

const UserDetailPage: React.FC = () => {
	const { userId } = useParams<{ userId: string }>();
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const { error, setError } = useError();
	const navigate = useNavigate();

	useEffect(() => {
		const getUserDetails = async () => {
			setError(null);
			setLoading(true);
			if (userId) {
				try {
					const response = await fetchUserDetails(parseInt(userId));
					setUserDetails(response.data);
				} catch (error) {
					setError("Failed to fetch user details. Please try again later.");
					console.error("Error fetching user details:", error);
				} finally {
					setLoading(false);
				}
			} else {
				setError("Invalid user ID.");
				setLoading(false);
			}
		};

		getUserDetails();
	}, [userId, setError]);

	if (error) {
		return (
			<div className='text-center text-red-500'>
				<p>{error}</p>
				<Button
					onClick={() => navigate(-1)}
					className='mt-4 bg-blue-800 text-white rounded ml-4'
				>
					Go Back
				</Button>
			</div>
		);
	}

	if (loading) {
		return (
			<div>
				<Loader />
			</div>
		);
	}

	const { firstName, lastName, image, role } = userDetails!;

	return (
		<>
			<Button
				onClick={() => navigate(-1)}
				className='mb-5 bg-blue-800 text-white rounded ml-4'
			>
				Go Back
			</Button>
			<div>
				<h2>
					{firstName} {lastName}
				</h2>
				<img src={image} alt={firstName} />
				<p>Role: {role}</p>
			</div>
		</>
	);
};

export default UserDetailPage;
