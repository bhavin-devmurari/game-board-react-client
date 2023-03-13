import React from "react";
import { clientSideDate } from "../../config";
import { MdModeEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { getTitleText } from "../../config";
import "./table.styles.css";

const Table = ({
  data,
  returnToParent,
  handleDeleteClick,
  isActionMode = true,
}) => {
  const columns = data[0] && Object.keys(data[0]);
  const escapeColumn = ["_id", "__v", "createdAt", "active"];
  return (
    // <table cellPadding={0} cellSpacing={0}>
    // <table border={5} className="table">
    <table className="table">
      <thead>
        <tr>
          {data[0] &&
            columns.map(
              (heading, idx) =>
                escapeColumn.indexOf(heading) === -1 && (
                  <th key={`${heading}`}>{getTitleText(heading)}</th>
                )
            )}
          {isActionMode && <th>#</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, ri) => (
          <tr key={`${row._id}_${ri}`}>
            {columns.map(
              (column, idx) =>
                escapeColumn.indexOf(column) === -1 && (
                  <td
                    data-label={getTitleText(column)}
                    key={`${row._id}_${ri}_${idx}`}
                  >
                    {column === "updatedAt"
                      ? clientSideDate(row[column])
                      : row[column] === ""
                      ? "null"
                      : row[column]}
                  </td>
                )
            )}
            {isActionMode && (
              <td data-label={"#"}>
                <MdModeEdit
                  className="pointer"
                  size={23}
                  fill="#ff835e"
                  onClick={() => returnToParent(row._id)}
                />

                <MdOutlineDeleteOutline
                  className="pointer"
                  size={23}
                  fill="#ff835e"
                  onClick={() => handleDeleteClick(row._id)}
                />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
