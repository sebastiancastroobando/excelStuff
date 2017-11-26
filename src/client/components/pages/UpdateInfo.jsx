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
      hobby:""
    };
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
  }
  handleChange(propertyName, event) {
    const contact = this.state;
    if(propertyName!='hobby'){
      contact[propertyName] = event.target.value;
    }else{
      contact[propertyName] = event.value;
    }
    this.setState({ contact: contact });
  }
  handleUserUpdate(event){
    event.preventDefault();
    //create object to send
    const updateInfo={
          firstname:this.state.firstname,
          lastname:this.state.lastname,
          about:this.state.about,
          email:this.state.email,
          phone:this.state.phone,
          zip:this.state.zip,
          hobby:this.state.hobby,
          userid:this.props.user

    }
    //set password if it is to be changed
    if(this.state.password==this.state.passwordConfirm && this.state.password!=''){
      updateInfo.password=this.state.password;
    }
    axios.post('/updateuser',updateInfo)
    .then(response=> {
      this.setState({updateSuccess:true});
    })

  }
  componentDidMount(){
    //get hobbies list
    axios.get('/gethobbies')
    .then(response=> {
      this.setState({hobbyOptions:response.data.map(function(obj){return {value:obj,label:obj}})});
    })
    //user info
    axios.get('/getuser?userid='+this.props.user).then(response=> {
      this.setState(response.data);
      this.setState({password:''});
      this.setState({updateSuccess:false});
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
            {this.state.password!=this.state.passwordConfirm? <Warning danger={true} message="Passwords don't match"/>:null}
            <label>About You</label>
            <textarea className="form-group form-control" required type="text" rows="5" onChange={this.handleChange.bind(this, 'about')} value={this.state.about}/>
            <label>Email:</label>
            <input className="form-group form-control" required type="email" onChange={this.handleChange.bind(this, 'email')} value={this.state.email}/>
            <label>Phone (XXX-XXX-XXXX):</label>
            <input className="form-group form-control" required type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={this.handleChange.bind(this, 'phone')} value={this.state.phone}/>
            <label>Zip Code:</label>
            <input className="form-group form-control" required type="text" onChange={this.handleChange.bind(this, 'zip')} value={this.state.zip}/>
            <div className="form-group">
                <label>First Preference:</label>
                <Select required value={this.state.hobby} options={this.state.hobbyOptions} onChange={this.handleChange.bind(this, 'hobby')}/>
            </div>
            <input type="submit" className="btn btn-primary" onClick={this.handleUserUpdate} value="Update Information"/>
          </form>
         </div>
          {this.state.updateSuccess==true ? <Warning danger={false} message="Update Sucessful"/>:null}
      </div>
    );
  }
}
