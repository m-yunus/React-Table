import React, { useMemo } from "react";
import { useTable,usePagination } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";

const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    nextPage,
    previousPage,
    page,
    rows,
    canNextPage,
    canPreviousPage,
    prepareRow,
  } = useTable({
    columns,data,
  },
  usePagination
  )

  return (
    <div className="table-container">
      <table {...getTableProps()} className="custom-table">
        <thead className="table-header">
          {headerGroups.map((headergroup) => (
            <tr {...headergroup.getHeaderGroupProps()}>
              {headergroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="table-body">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
       <div>
        <button onClick={()=>previousPage()} disabled={!canPreviousPage}>PRev</button>
        <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
       </div>
      </table>
    </div>
  );
};

export default PaginationTable;
