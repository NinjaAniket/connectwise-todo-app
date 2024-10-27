import React from "react";
import Button from "../components/ui/Button";

interface PaginationProps {
	totalItems: number;
	itemsPerPage: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	totalItems,
	itemsPerPage,
	currentPage,
	onPageChange,
}) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const handleClick = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	return (
		<div className='flex justify-center items-center mt-4'>
			<Button
				onClick={() => handleClick(currentPage - 1)}
				disabled={currentPage === 1}
			>
				Previous
			</Button>

			<span className='mx-4 text-lg'>
				Page {currentPage} of {totalPages}
			</span>

			<Button
				onClick={() => handleClick(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				Next
			</Button>
		</div>
	);
};

export default Pagination;
