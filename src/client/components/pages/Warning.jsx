import React from 'react';

export default class Warning extends React.Component{
  render(){
    return(
      <div className={this.props.danger==true ? "alert alert-danger":"alert alert-success"}>
        <strong> {this.props.message} </strong>
      </div>
    )
  }
}
