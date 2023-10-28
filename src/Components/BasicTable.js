import React, { useMemo } from "react";
import { useTable } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";


const BasicTable = () => {
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const tableInstance = useTable({
    columns,
    data,
  });
  const { getTableProps, getTableBodyProps, headerGroups,footerGroups, rows, prepareRow } =
    tableInstance;

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
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot className="table-header">
          {
            footerGroups.map(footergroup=>(
              <tr {...footergroup.getFooterGroupProps()}>
                    {
                      footergroup.headers.map(column=>(
                        <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                        ))
                    }
              </tr>
            ))
          }
        </tfoot>
      </table>
    </div>
  );
};

export default BasicTable;
