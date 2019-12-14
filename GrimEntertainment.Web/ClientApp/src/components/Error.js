import React, { Component, Fragment } from 'react';
export class Error extends Component {
    constructor(props) {
        super(props);

        this.state = { error: this.props.errorMessage };
    }
    
    render() {
        let content = <Fragment><div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ textAlign: "center" }}>
            <strong>{this.state.error}</strong>
        </div></Fragment>;
        return (content);
    }
}