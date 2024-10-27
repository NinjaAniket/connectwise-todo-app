import React from "react";

interface TableCellProps {
	children: React.ReactNode;
}

const TableCell: React.FC<TableCellProps> = ({ children }) => {
	return (
		<td className='border border-gray-300 px-4 py-2 min-h-[50px]'>
			{children}
		</td>
	);
};

export default TableCell;
