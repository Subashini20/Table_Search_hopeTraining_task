import React, { Component } from 'react';
import {Table} from 'react-bootstrap'
import './style.css';
import {Data} from './tabledata.js'


class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Id: '',
      Name: "",
      Dept: "",
      Degree: "",
      Doj: "",
      details:Data,
      searchlist:[],
      searchdata:""  
    }
  }
  addRow = () => {

    if(this.state.Id !=="" && this.state.Name !=="" && this.state.Degree !="" && this.state.Dept !="" && this.state.Doj !="")
    {
 
      this.state.details.push({
        Id:this.state.Id,
        Name:this.state.Name,
        Dept:this.state.Dept,
        Degree:this.state.Degree,
        Doj:this.state.Doj,
      })
      this.setState({
        details:this.state.details,
        Name:"",
        Doj:"",
        Id:"",
        Dept:"",
        Degree:"",
      })
    }
    else{
      alert('Enter all the details')
    }
  }
  Onsearch=(e)=>{
  let searchitem=e.target.value;
  let {searchlist}=this.state
  console.log(e.target.value) 
  if(e.target.value !="")
  {
    searchlist=this.state.details.filter(item=>
              item.Name != null && item.Name.toLowerCase().includes(searchitem) || 
              item.Degree != null && item.Degree.toLowerCase().includes(searchitem) ||  
              item.Dept != null && item.Dept.toLowerCase().toString().toLowerCase().includes(searchitem)
            )
            this.setState({
              searchdata:e.target.value,
              searchlist:searchlist    
            }) 
  }
  else{
    this.setState({
      searchdata:'',
      searchlist:[],
      details:Data,
    })  
  }
     }
  handlechange = (e) => {    
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  render() {
    console.log(Data)
    return (
      <>
      <h1>Table Filter</h1>
        <div className='form'> 
          <div className='inputfield'>
          
            <input type="text" name="Id" value={this.state.Id} placeholder="Enter id" onChange={(e) => { this.handlechange(e) }}/>
          </div>
          <div className='inputfield'>
           
            <input type="text" name="Name" value={this.state.Name}  placeholder="Enter Name" onChange={(e) => { this.handlechange(e) }} />
          </div>
          <div className='inputfield'>
           
            <input type="text" name="Dept" value={this.state.Dept}  placeholder="Enter Department" onChange={(e) => { this.handlechange(e) }}/>
          </div>
          <div className='inputfield'>
          
            <input type="text" name="Degree" value={this.state.Degree}  placeholder="Enter Degree" onChange={(e) => { this.handlechange(e) }}/>
          </div>
          <div className='inputfield'>
           
            <input type="date" name="Doj" value={this.state.Doj}  placeholder="Enter Doj" onChange={(e) => { this.handlechange(e) }}/>
          </div>
          <button type="submit" onClick={this.addRow}>Add</button>
        </div>

        <div className='search'>         
          <input type="text" placeholder='Search here...' name="searchdata" value={this.state.searchdata} onChange={(e)=>{this.Onsearch(e)}}></input>
        </div>
          <table>
            <thead>
              <tr>               
                <th >id</th>
                <th >Name</th>
                <th>Department</th>
                <th>Degree</th>
                <th >DOJ</th>
              </tr>
            </thead>
            <tbody>
              
            {this.state.details.filter((a)=>{ return this.state.searchdata =="" ? a :  a.Name != null && a.Name.toLowerCase().includes(this.state.searchdata) || a.Degree != null && a.Degree.toLowerCase().includes(this.state.searchdata) ||  a.Dept != null && a.Dept.toString().toLowerCase().includes(this.state.searchdata)}).map((item)=>{
                  return (
                    <tr key={item.Id}>                     
                    <td>{item.Id}</td>
                    <td>{item.Name}</td>
                    <td>{item.Dept}</td>
                    <td>{item.Degree}</td>
                    <td>{item.Doj}</td>
                    </tr>
                  )
                 

                })}
               
              
            </tbody>
          </table>
        <footer style={{textAlign: 'left', marginTop: "20px"}}>
          <h3>Total no of rows:<span style={{fontWeight: "400", fontSize: "16px"}}> {this.state.searchdata == ""?this.state.details.length:
          this.state.searchlist.length} of {this.state.details.length}</span></h3> 
         

        </footer>
       

      </>

    )
  }



}
export default Search