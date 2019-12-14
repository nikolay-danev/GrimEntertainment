import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import '../../custom.css';

export class AdditionalInformationPopUp extends Component {
    constructor(props) {
        super(props);

        this.state = { description: props.description, downloadLink: props.downloadLink };
    }

    render() {
        return (
            <Popup trigger={<a style={{ marginLeft: 10 }} rel="noopener noreferrer" title="Additional info"><i style={{ color: "darkred" }} className="fa fa-question" aria-hidden="true"></i></a>} position="top left">
                {close => (
                    <div>
                        <div className="scrollable" style={{ color: 'darkred', fontFamily: 'Candara, sans-serif' }}>{this.state.description}</div>
                        <a href={this.state.downloadLink} target="_blank" className="pageTitle" style={{
                            bottom: 0,
                            position: "absolute",
                            textDecoration: "none",
                            backgroundColor: "lightgrey",
                            width: 348,
                            left: 0
                        }}>Download now</a>
                        <a className="close" onClick={close} style={{ position: "absolute", top: -20, right: -15 }}>
                            &times;
        </a>
                    </div>
                )}
            </Popup>
            );
    }
}