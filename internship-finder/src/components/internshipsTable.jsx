import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
//import Like from "./common/like";

class InternshipsTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: internship => <Link to={`/internship/${internship._id}`}>{internship.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
  ];

  deleteColumn = {
    key: "delete",
    content: internship => (
      <button
        onClick={() => this.props.onDelete(internship)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  render() {
    const { internships, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={internships}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default InternshipsTable;