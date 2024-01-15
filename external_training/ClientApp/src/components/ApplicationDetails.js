import React, { Component } from 'react';
import { ApplicationDetails } from "./application-details/application-details";
import { mockApplicationDetails} from "./application-details/mock";
import {useAppSelector} from "../hooks";
import {getApplicationDetails} from "../store/selectors";

export class ApplicationDetailsPage extends Component {
    render() {
        return (
            <div>

                <ApplicationDetails />
            </div>
        );
    }
}