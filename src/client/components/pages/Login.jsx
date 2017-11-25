import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import App from './App.jsx';
import Warning from './Warning.jsx';
import axios from 'axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            validLogin:true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        if(this.state.username!=null&& this.state.password!=null){
          axios.post('/login',{
            username:this.state.username,
            password:this.state.password
          })
          .then(response=> {
            ReactDOM.render (<App user={response.data}/>, window.document.getElementById("root"))
          })
          .catch(error=> {
            this.setState({validLogin:false});
          });
        }
    }

    render() {
        const { username, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>
                    {this.state.validLogin ? null:<Warning message="Invalid Login"/>}
                </form>
            </div>
        );
    }
}
