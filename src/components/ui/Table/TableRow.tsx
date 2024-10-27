import React from "react";

interface TableRowProps {
	children: React.ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({ children }) => {
	return <tr className='hover:bg-gray-500'>{children}</tr>;
};

export default TableRow;
