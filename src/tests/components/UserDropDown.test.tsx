import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fetchUsers } from "../../service";
import { ErrorProvider } from "../../components/ErrorContext";
import UserDropdown from "../../components/UserDropdown";
import { Mock, vi } from "vitest";

vi.mock("../../service", () => ({
	fetchUsers: vi.fn(),
}));

describe("UserDropdown Component", () => {
	const mockUsers = [
		{ id: 1, firstName: "John", lastName: "Doe" },
		{ id: 2, firstName: "Jane", lastName: "Smith" },
	];

	const mockOnUserSelect = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should render users after successful fetch", async () => {
		(fetchUsers as Mock).mockResolvedValueOnce({
			data: { users: mockUsers },
		});

		render(
			<ErrorProvider>
				<UserDropdown onUserSelect={mockOnUserSelect} />
			</ErrorProvider>
		);

		await waitFor(() =>
			expect(screen.getByText("John Doe")).toBeInTheDocument()
		);

		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("Jane Smith")).toBeInTheDocument();
	});

	it("should handle API errors and display an error message", async () => {
		(fetchUsers as Mock).mockRejectedValueOnce(new Error("API Error"));

		render(
			<ErrorProvider>
				<UserDropdown onUserSelect={mockOnUserSelect} />
			</ErrorProvider>
		);

		await waitFor(() =>
			expect(
				screen.getByText("Failed to fetch users. Please try again later.")
			).toBeInTheDocument()
		);

		expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
	});

	it("should call onUserSelect when a user is selected and form is submitted", async () => {
		(fetchUsers as Mock).mockResolvedValueOnce({
			data: { users: mockUsers },
		});

		render(
			<ErrorProvider>
				<UserDropdown onUserSelect={mockOnUserSelect} />
			</ErrorProvider>
		);

		await waitFor(() =>
			expect(screen.getByText("John Doe")).toBeInTheDocument()
		);

		fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });

		fireEvent.click(screen.getByText("Search"));

		expect(mockOnUserSelect).toHaveBeenCalledWith(1);
	});
});
