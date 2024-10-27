import React from "react";

interface TableProps {
	columns: string[];
	children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ columns, children }) => {
	return (
		<table className='table-auto w-[800px]  border-collapse border border-gray-300'>
			<thead>
				<tr className='bg-gray-700'>
					{columns.map((column, index) => (
						<th key={index} className='border border-gray-300 px-4 py-2'>
							{column}
						</th>
					))}
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</table>
	);
};

export default Table;
