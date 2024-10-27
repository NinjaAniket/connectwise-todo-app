import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import TodoTable from "../../components/TodoTable";

vi.mock("react-router-dom", () => ({
	useNavigate: vi.fn(),
}));

describe("TodoTable Component", () => {
	const mockTodos = [
		{ id: 1, todo: "Buy groceries", completed: false, userId: 101 },
		{ id: 2, todo: "Read a book", completed: true, userId: 102 },
	];

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should display a message when no todos are available", () => {
		render(<TodoTable todos={[]} />);

		expect(
			screen.getByText("No todos available for this user.")
		).toBeInTheDocument();
	});

	it("should render the correct number of rows based on todos", () => {
		render(<TodoTable todos={mockTodos} />);

		const rows = screen.getAllByRole("row");
		expect(rows.length).toBe(mockTodos.length + 1);
	});

	it("should display the correct data for each todo", () => {
		render(<TodoTable todos={mockTodos} />);

		expect(screen.getByText("Buy groceries")).toBeInTheDocument();
		expect(screen.getByText("Read a book")).toBeInTheDocument();
		expect(screen.getByText("No")).toBeInTheDocument();
		expect(screen.getByText("Yes")).toBeInTheDocument();
	});
});
