import React, { Component } from 'react';
import { RouteProps } from 'react-router';
import { ApplicationDetails} from "./components/application-details/application-details";

export class ApplicationDetailsPage extends React.Component<RouteProps> {
    render() {
        const applicationId = Number(window.location.href.split('/')[4]);
        return (
            <div>

                < ApplicationDetails id={applicationId} />
            </div>
        );
    }
}