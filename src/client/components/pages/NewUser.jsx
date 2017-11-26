import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import App from './App.jsx';
import axios from 'axios';
import Warning from './Warning.jsx';

export default class newUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: '',
                lastname: '',
                username: '',
                password: ''
            },
            submitted: false,
            validLogin:true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ user: { ...this.state.user, [name]: value } });

    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });

        if(this.state.user.username && this.state.user.password && this.state.user.firstname && this.state.user.lastname){
          axios.post('/createuser',{
            username:this.state.user.username,
            password:this.state.user.password,
            firstname:this.state.user.firstname,
            lastname:this.state.user.lastname
          })
          .then(response=> {

            ReactDOM.render (<App user={response.data}/>, window.document.getElementById("root"));
          })
          .catch(error=> {
            if(error.response.status==409){
              this.setState({validLogin:false});
            }
          });
        }
    }
    render() {
        return (
            <div className="container">
              <h1 className="text-center">Match Maker</h1>
              <div style={{marginTop:"10px"}} className="col-md-6 col-md-offset-3 jumbotron">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (this.state.submitted && !this.state.user.firstname ? ' has-error' : '')}>
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" className="form-control" name="firstname" value={this.state.user.firstname} onChange={this.handleChange} />
                        {this.state.submitted && !this.state.user.firstname &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (this.state.submitted && !this.state.user.lastname ? ' has-error' : '')}>
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" className="form-control" name="lastname" value={this.state.user.lastname} onChange={this.handleChange} />
                        {this.state.submitted && !this.state.user.lastname &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (this.state.submitted && !this.state.user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={this.state.user.username} onChange={this.handleChange} />
                        {this.state.submitted && !this.state.user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (this.state.submitted && !this.state.user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={this.state.user.password} onChange={this.handleChange} />
                        {this.state.submitted && !this.state.user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        <Link to="/" className="btn btn-link">Cancel</Link>
                    </div>
                    {this.state.validLogin ? null:<Warning danger={true} message="Username already taken"/>}
                </form>
            </div>
          </div>
        );
    }
}
