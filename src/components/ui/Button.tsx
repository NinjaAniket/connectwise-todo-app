import React from "react";

interface ButtonProps {
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
	children: React.ReactNode;
	type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
	onClick,
	disabled,
	className,
	children,
	type = "button",
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			type={type}
			className={`px-4 py-2 rounded-lg font-semibold ${className} ${
				disabled
					? "bg-gray-300 text-gray-500 cursor-not-allowed"
					: "bg-blue-500 text-white hover:bg-blue-600"
			}`}
		>
			{children}
		</button>
	);
};

export default Button;
