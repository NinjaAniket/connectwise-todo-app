import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "../../components/Pagination";

describe("Pagination Component", () => {
	const mockOnPageChange = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should disable the "Previous" button when on the first page', () => {
		render(
			<Pagination
				totalItems={100}
				itemsPerPage={10}
				currentPage={1}
				onPageChange={mockOnPageChange}
			/>
		);

		const previousButton = screen.getByText("Previous");
		expect(previousButton).toBeDisabled();
	});

	it('should disable the "Next" button when on the last page', () => {
		render(
			<Pagination
				totalItems={100}
				itemsPerPage={10}
				currentPage={10}
				onPageChange={mockOnPageChange}
			/>
		);

		const nextButton = screen.getByText("Next");
		expect(nextButton).toBeDisabled();
	});

	it('should call onPageChange with the correct page number when "Previous" is clicked', () => {
		render(
			<Pagination
				totalItems={100}
				itemsPerPage={10}
				currentPage={5}
				onPageChange={mockOnPageChange}
			/>
		);

		const previousButton = screen.getByText("Previous");
		fireEvent.click(previousButton);

		expect(mockOnPageChange).toHaveBeenCalledWith(4);
	});

	it('should call onPageChange with the correct page number when "Next" is clicked', () => {
		render(
			<Pagination
				totalItems={100}
				itemsPerPage={10}
				currentPage={5}
				onPageChange={mockOnPageChange}
			/>
		);

		const nextButton = screen.getByText("Next");
		fireEvent.click(nextButton);

		expect(mockOnPageChange).toHaveBeenCalledWith(6);
	});

	it("should display the correct page number and total pages", () => {
		render(
			<Pagination
				totalItems={100}
				itemsPerPage={10}
				currentPage={5}
				onPageChange={mockOnPageChange}
			/>
		);

		expect(screen.getByText("Page 5 of 10")).toBeInTheDocument();
	});
});
