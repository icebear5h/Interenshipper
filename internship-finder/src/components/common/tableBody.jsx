import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  getColor(item){
    if (!item.pay) return;
    let color = "table-"
    if (item.pay === "Stipend") color = color+"success";
    else if (item.pay === "Unpaid") color = color+"warning";
    else color = color + "danger";
    return color;
  }

  render() {
    const { data, columns } = this.props;
  
    return (
      <tbody>
        {data.map((item,idx) => (
          <tr key={`tableItem_${idx}${item._id}`}>
            {columns.map(column => (
              <td key={this.createKey(item, column)} className={this.getColor(item)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
export function getColor(){};
