import { render, screen } from "@testing-library/react";
import Loader from "../../components/ui/Loader";

describe("Loader Component", () => {
	it("should render the SVG with correct attributes", () => {
		render(<Loader />);

		const svgElement = screen.getByTestId("loader-svg");
		expect(svgElement).toBeInTheDocument();

		const circleElement = svgElement.querySelector("circle");
		expect(circleElement).toBeInTheDocument();
	});
});
