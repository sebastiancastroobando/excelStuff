import React from 'react';

export default class Warning extends React.Component{
  render(){
    return(
      <div className="alert alert-danger">
        <strong>Error:</strong> {this.props.message}.
      </div>
    )
  }
}
