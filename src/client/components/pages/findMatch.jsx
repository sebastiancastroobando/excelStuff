import React from 'react';
import Warning from './Warning.jsx';
import Match from './Match.jsx';
import axios from 'axios';

export default class FindMatch extends React.Component {
  constructor(props){
    super(props);
    this.state={
      matchFound:false,
      matchRequest:false,
      match:null
    };
    this.findMatch = this.findMatch.bind(this);

  }
  findMatch(event){
    event.preventDefault();
    axios.get('/findmatch')
    .then(response=> {
      this.setState({match:response.data});
      this.setState({matchFound:true});
    })
    .catch(error=> {
      this.setState({matchFound:false});
    });
    this.setState({matchRequest:true})
  }

  render() {
    return (
      <div className="container">
        {this.state.matchRequest && this.state.matchFound ?
            <Match match={this.state.match} />
          : this.state.matchRequest && !this.state.matchFound ? <Warning danger={true} message="Sorry No One Likes You"/>
          :<div>
            <h3 className="text-center">Get A Match:</h3>
            <input type="submit" className="btn btn-primary center-block" onClick={this.findMatch} value="Find Match"/>
          </div>
        }
      </div>
    );
  }
}
