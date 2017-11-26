import React from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class Match extends React.Component {
  constructor(props){
    super(props);
    this.state={
      zoom: 16,
      locationFound:false
    };
  }

  componentDidMount(){
    //get longitude and latitude
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBj_McDbYsrs-J5tXntOmRAgbSvNOZXr2Y&address='+this.props.match.zip)
    .then(response=> {
      this.setState({center:response.data.results[0].geometry.location});
      this.setState({locationFound:true});
    })

  }
  render() {
    return (
      <div className="container">
        <div className="alert alert-success text-center"><strong>Success!</strong> Here is your match!</div>
        <h3 className="text-center">{this.props.match.firstname + ' ' + this.props.match.lastname}</h3>
        <div className="form-group">
            <label>About {this.props.match.firstname + ' ' + this.props.match.lastname}:</label>
            <textarea  style={{background:"#fff"}} className="form-control" disabled value={this.props.match.about} rows="5"/>
        </div>
        <label>Contact Info:</label>
          <ul className="list-group">
            <li className="list-group-item">Phone: {this.props.match.phone}</li>
            <li className="list-group-item">Email: {this.props.match.email}</li>
          </ul>
        <label>Location:</label>
          {this.state.locationFound ?
            <GoogleMapReact
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
            >
            </GoogleMapReact>
          :null}
        <h4 className="text-center">Good Luck!</h4>
      </div>
    );
  }
}
