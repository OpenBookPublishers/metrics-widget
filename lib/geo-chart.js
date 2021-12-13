import React, { Component } from "react";
import { ContinentsChart } from "./continent-chart";
import { CountryChart } from "./country-chart";
import { Switch } from "@headlessui/react";

export class GeoChart extends Component {
    constructor(props) {
        super(props);
        this.toggleTabContinent = this.toggleTabContinent.bind(this);
        this.toggleTabCountry = this.toggleTabCountry.bind(this);
        this.state = { enabled: false };
    }

    toggleTabContinent() {
        this.setState({ enabled: false });
    }

    toggleTabCountry() {
        this.setState({ enabled: true });
    }

    render() {
        return (
            <div className='p-2 h-200 w-full border-gray-200 border-t-2 border-b-2'>
                <Switch
                    checked={this.state.enabled}
                    onChange={
                        this.state.enabled
                            ? this.toggleTabContinent
                            : this.toggleTabCountry
                    }
                    className={`${
                        this.state.enabled ? "bg-blue-600" : "bg-gray-200"
                    } relative inline-flex items-center h-6 rounded-full w-11`}
                >
                    <span
                        className={`${
                            this.state.enabled
                                ? "translate-x-6"
                                : "translate-x-1"
                        } inline-block w-4 h-4 transform bg-white rounded-full`}
                    />
                </Switch>

                {this.state.enabled === false && (
                    <ContinentsChart
                        apiEndpoint={this.props.apiEndpoint}
                        doi={this.props.doi}
                    />
                )}
                {this.state.enabled === true && (
                    <CountryChart
                        apiEndpoint={this.props.apiEndpoint}
                        doi={this.props.doi}
                    />
                )}
            </div>
        );
    }
}
