import React, { Component } from 'react';
import { ApplicationDetails } from "./pages/application-details/application-details";
import { mockApplicationDetails} from "./pages/application-details/mock";

export class ApplicationDetailsPage extends Component {
    render() {
        return (
            <div>
                <ApplicationDetails {...mockApplicationDetails}/>
            </div>
        );
    }
}