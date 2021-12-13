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
            <div className='h-full w-full'>
                <div className="flex items-center justify-center mb-4">
                    <Switch
                        checked={!this.state.enabled}
                        onChange={
                            this.state.enabled
                                ? this.toggleTabContinent
                                : this.toggleTabCountry
                        }
                        className={`${
                            this.state.enabled ? "text-gray-400 border-transparent" : "text-blue-600 border-blue-600"
                        } relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs`}
                    >
                        <span>
                            Proportion of Usage by Continent
                        </span>
                    </Switch>
                    <Switch
                        checked={this.state.enabled}
                        onChange={
                            this.state.enabled
                                ? this.toggleTabContinent
                                : this.toggleTabCountry
                        }
                        className={`${
                            !this.state.enabled ? "text-gray-400 border-transparent" : "text-blue-600 border-blue-600"
                        } relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs`}
                    >
                        <span>
                            Proportion of Usage by Country
                        </span>
                    </Switch>
                </div>
                <div className="h-5/6">
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
            </div>
        );
    }
}
