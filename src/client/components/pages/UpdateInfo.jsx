import React from 'react';
import Warning from './Warning.jsx';
import Select from 'react-select';
import axios from 'axios';
import 'react-select/dist/react-select.css';

export default class UpdateInfo extends React.Component {
  constructor(props){
    super(props);
    this.state={
      firstname:"",
      lastname:"",
      password:"",
      passwordConfirm:"",
      about:"",
      email:"",
      phone:"",
      zip:"",
      hobbies:{
        first:null,
        second:null,
        third:null
      }
    };
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.handleHobbieUpdate = this.handleHobbieUpdate.bind(this);
  }
  handleChange(propertyName, event) {
    const contact = this.state;
    contact[propertyName] = event.target.value;
    this.setState({ contact: contact });
  }
  handleHobbieChange(propertyName,event){
    const contact = this.state.hobbies;

    //make current option selectable
    if(event!=null && contact[propertyName]!=null){
      var objIndex = this.state.hobbieOptions.findIndex((obj => obj.value == contact[propertyName]));
      this.state.hobbieOptions[objIndex].disabled=false;
    }

    contact[propertyName] = (event==null)? null:event.value;
    //disable selected option
    var objIndex = this.state.hobbieOptions.findIndex((obj => obj.value == event.value));
    this.state.hobbieOptions[objIndex].disabled=true;

    this.setState({ contact: contact });
  }
  handleUserUpdate(){
    event.preventDefault();

    axios.post('/updateuser',
    {
      firstname:this.state.firstname,
      lastname:this.state.lastname,
      about:this.state.about,
      email:this.state.email,
      phone:this.state.phone,
      zip:this.state.zip,
      userid:this.props.user
    }
    )
    .then(response=> {
      console.log(response);
    })

  }
  handleHobbieUpdate(){
    //TODO
    console.log(this.state.hobbies);
    event.preventDefault();
  }
  componentDidMount(){
    //get hobbies list
    axios.get('/gethobbies')
    .then(response=> {
      this.setState({hobbieOptions:response.data.map(function(obj){return {value:obj,label:obj,disabled:false}})});
    })
    console.log(this.props.user);
    axios.get('/getuser?userid='+this.props.user).then(response=> {
      console.log(response.data);
      this.setState(response.data);
      this.setState({password:''});
    })
  }
  render() {
    return (
      <div className="container">
          <div>
            <h3>User Information:</h3>
            <form>
            <label>First Name:</label>
            <input className="form-group form-control" required type="text" onChange={this.handleChange.bind(this, 'firstname')} value={this.state.firstname}/>
            <label>Last Name:</label>
            <input className="form-group form-control" required type="text" onChange={this.handleChange.bind(this, 'lastname')} value={this.state.lastname}/>
            <label>Password</label>
            <input className="form-group form-control" placeholder="leave blank to not change password" type="password" onChange={this.handleChange.bind(this, 'password')} value={this.state.password}/>
            <label>Complete Password</label>
            <input className="form-group form-control" type="password" onChange={this.handleChange.bind(this, 'passwordConfirm')} value={this.state.passwordConfirm}/>
            {this.state.password!=this.state.passwordConfirm? <Warning message="Passwords don't match"/>:null}
            <label>About You</label>
            <textarea className="form-group form-control" required type="text" rows="5" onChange={this.handleChange.bind(this, 'about')} value={this.state.about}/>
            <label>Email:</label>
            <input className="form-group form-control" required type="email" onChange={this.handleChange.bind(this, 'email')} value={this.state.email}/>
            <label>Phone (XXX-XXX-XXXX):</label>
            <input className="form-group form-control" required type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={this.handleChange.bind(this, 'phone')} value={this.state.phone}/>
            <label>Zip Code:</label>
            <input className="form-group form-control" required type="text" onChange={this.handleChange.bind(this, 'zip')} value={this.state.zip}/>
            <input type="submit" className="btn btn-primary" onClick={this.handleUserUpdate} value="Update Information"/>
          </form>
          </div>
          <div>
            <h3>Hobbie Preferences:</h3>
            <form>
            <div className="form-group">
              <label>First Preference:</label>
              <Select required value={this.state.hobbies.first} placeholder="select first hobbie" options={this.state.hobbieOptions} onChange={this.handleHobbieChange.bind(this, 'first')}/>
            </div>
            <div className="form-group">
              <label>Second Preference:</label>
              <Select required value={this.state.hobbies.second} placeholder="select second hobbie" options={this.state.hobbieOptions} onChange={this.handleHobbieChange.bind(this, 'second')}/>
            </div>
            <div className="form-group">
              <label>Third Preference:</label>
              <Select required value={this.state.hobbies.third} placeholder="select third hobbie" options={this.state.hobbieOptions} onChange={this.handleHobbieChange.bind(this, 'third')}/>
            </div>
            <input type="submit" className="btn btn-primary" onClick={this.handleHobbieUpdate} value="Update Preferences"/>
            </form>
          </div>
      </div>
    );
  }
}
