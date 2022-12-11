import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import { getUser } from "../services/userService";
//import Like from "./common/like";
import AddListButton from './addListButton';

class InternshipsTable extends Component {
  state = {
    user: null
  }
  columns = [
    {
      path: "provider",
      label: "Provider",
    },
    {
      path: "title",
      label: "Title"
    },
    //{ path: "tags", label: "Tags" },
    {
      path: "pay",
      label: "Pay",
    },

  ];

  async componentDidMount () {
    const user = await getUser();
    //console.log(user);
    this.setState({user});
  }

  // deleteColumn = {
  //   key: "delete",
  //   content: internship => (
  //     <button
  //       onClick={() => this.props.onDelete(internship)}
  //       className="btn btn-danger btn-sm"
  //     >
  //       Delete
  //     </button>
  //   )
  // };
  addColumn = {
    key: "key",
    content: internship => (
      <AddListButton 
        user={this.state.user} 
        internship={internship}
        updateUser= {(user)=> this.setState({user})}
        key={`addListButton${internship.id}`}
      />
    )
  }


  render() {
    const { internships, onSort, sortColumn } = this.props;
    //console.log(this.state.user);
    const columnsToShow = this.columns;
    if (this.state.user && !columnsToShow.includes(this.addColumn))columnsToShow.push(this.addColumn);
    //console.log(columnsToShow);
    return (
      <Table
        columns={columnsToShow}
        data={internships}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default InternshipsTable;
