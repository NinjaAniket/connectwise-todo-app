import React, { createContext, useState, useContext, ReactNode } from "react";

interface ErrorContextProps {
	error: string | null;
	setError: (error: string | null) => void;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const useError = () => {
	const context = useContext(ErrorContext);
	if (!context) {
		throw new Error("useError must be used within an ErrorProvider");
	}
	return context;
};

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [error, setError] = useState<string | null>(null);

	return (
		<ErrorContext.Provider value={{ error, setError }}>
			{children}
		</ErrorContext.Provider>
	);
};
