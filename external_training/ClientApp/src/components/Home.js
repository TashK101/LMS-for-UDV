import React, { Component } from 'react';
import {ApplicationDetails} from "./application-details/application-details";

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <ApplicationDetails />
            </div>
        );
    }
}