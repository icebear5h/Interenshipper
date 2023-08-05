import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import InternshipsTable from "./internshipsTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getInternships } from "../services/internshipService"
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Internships extends Component {
    state = {
        internships: [],
        //genres: [],
        currentPage: 1,
        pageSize: 8,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: { path: "title", order: "asc" }
    };

    async componentDidMount() {
        //const {data} = await getGenres();
        //const genres = [{ _id: "", name: "All Genres" }, ...data];
        const {data:internships} = await getInternships();
        //console.log(internships,genres)
        const estimatedRowHeight = 50; // Adjust this value based on your actual row height
        const headerFooterHeight = 200; // Adjust this value based on the height of your other elements
        const availableHeight = window.innerHeight - headerFooterHeight;
        const pageSize = Math.floor(availableHeight / estimatedRowHeight);
        this.setState({ internships, pageSize });
    }

    //   handleLike = internship => {
    //     const internships = [...this.state.internships];
    //     const index = internships.indexOf(internship);
    //     internships[index] = { ...internships[index] };
    //     internships[index].liked = !internships[index].liked;
    //     this.setState({ internships });
    //   };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    // handleGenreSelect = genre => {
    //     this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
    // };

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    getPagedData = () => {
        const {
            pageSize,
            currentPage,
            sortColumn,
            selectedGenre,
            searchQuery,
            internships: allInternships
        } = this.state;

        let filtered = allInternships;
        if (searchQuery)
            filtered = allInternships.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedGenre && selectedGenre._id)
            filtered = allInternships.filter(m => m.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const internships = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: internships };
    };

    render() {
        const { length: count } = this.state.internships;
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
        const { user } = this.props;

        if (count === 0) return <p>There are no internships in the database.</p>;

        const { totalCount, data: internships } = this.getPagedData();

        return (
            <div className="row">
                {/* <div className="col-2 align-self-start">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div> */}
                <div className="col">
                    {user && (
                        <Link
                            to="/internships/new"
                            className="btn btn-primary"
                            style={{ marginBottom: 20 }}
                        >
                            New internship
                        </Link>
                    )}
                    <p>Showing {totalCount} internships in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <InternshipsTable
                        internships={internships}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Internships;
