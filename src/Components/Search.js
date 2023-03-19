import React, { Component } from "react";
import "./style.css";
import { Data } from "./tabledata.js";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: "",
      Name: "",
      Dept: "",
      Degree: "",
      Doj: "",
      details: Data,
      searchlist: [],
      searchdata: ""
    };
  }
  handleAddRow = () => {
    const { Id, Name, Dept, Degree, Doj } = this.state;

    if (Id && Name && Dept && Degree && Doj) {
      const newDetails = [
        ...this.state.details,
        { Id, Name, Dept, Degree, Doj }
      ];
      this.setState({
        details: newDetails,
        Id: "",
        Name: "",
        Dept: "",
        Degree: "",
        Doj: ""
      });
    } else {
      alert("Please enter all the details.");
    }
  };
  onSearch = (event) => {
    const searchItem = event.target.value.toLowerCase();
    const searchList = this.state.details.filter(
      (item) =>
        item.Name?.toLowerCase().includes(searchItem) ||
        item.Degree?.toLowerCase().includes(searchItem) ||
        item.Dept?.toLowerCase().includes(searchItem)
    );
    this.setState({
      searchdata: searchItem,
      searchlist: searchList // change this to searchList (uppercase "L")
    });
  };
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { details, searchdata, searchlist } = this.state;
    const filteredDetails = searchdata
      ? searchlist.length
        ? searchlist
        : []
      : details;

    return (
      <>
        <h1>Table Filter</h1>
        <div className="form">
          <div className="inputfield">
            <input
              type="text"
              name="Id"
              value={this.state.Id}
              placeholder="Enter id"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="inputfield">
            <input
              type="text"
              name="Name"
              value={this.state.Name}
              placeholder="Enter Name"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="inputfield">
            <input
              type="text"
              name="Dept"
              value={this.state.Dept}
              placeholder="Enter Department"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="inputfield">
            <input
              type="text"
              name="Degree"
              value={this.state.Degree}
              placeholder="Enter Degree"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="inputfield">
            <input
              type="date"
              name="Doj"
              value={this.state.Doj}
              placeholder="Enter Doj"
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit" onClick={this.handleAddRow}>
            Add
          </button>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Search here..."
            name="searchdata"
            value={this.state.searchData}
            onChange={this.onSearch}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Department</th>
              <th>Degree</th>
              <th>DOJ</th>
            </tr>
          </thead>
          <tbody>
            {filteredDetails.map((item) => {
              return (
                <tr key={item.Id}>
                  <td>{item.Id}</td>
                  <td>{item.Name}</td>
                  <td>{item.Dept}</td>
                  <td>{item.Degree}</td>
                  <td>{item.Doj}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <footer style={{ textAlign: "left", marginTop: "20px" }}>
          <h3>
            Total no of rows:{" "}
            <span style={{ fontWeight: "400", fontSize: "16px" }}>
              {filteredDetails.length} of {details.length}
            </span>
          </h3>
        </footer>
      </>
    );
  }
}
export default Search;
