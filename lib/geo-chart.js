import React, { Component } from "react";
import { ContinentsChart } from "./continent-chart";
import { CountryChart } from "./country-chart";
import { Switch } from "@headlessui/react";
import { MapChart } from "./map-chart";
import { Tab } from "@headlessui/react";

export class GeoChart extends Component {
    constructor(props) {
        super(props);
        this.toggleTabContinent = this.toggleTabContinent.bind(this);
        this.toggleTabCountry = this.toggleTabCountry.bind(this);
        this.toggleTabMap = this.toggleTabMap.bind(this);
        this.state = { tab: "continent" };
    }

    toggleTabContinent() {
        this.setState({ tab: "continent" });
    }

    toggleTabCountry() {
        this.setState({ tab: "country" });
    }

    toggleTabMap() {
        this.setState({ tab: "map" });
    }

    render() {
        return (
            <div className='h-full w-full'>
                <div className='flex items-center justify-center mb-4'>
                    {/* <Switch
                        checked={this.state.tab != "continent"}
                        onChange={
                            this.state.tab != "continent"
                                ? this.toggleTabContinent
                                : this.toggleTabCountry
                        }
                        className={`${
                            this.state.tab != "continent"
                                ? "text-gray-400 border-transparent"
                                : "text-blue-600 border-blue-600"
                        } relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs`}
                    >
                        <span>Usage By Continent</span>
                    </Switch>
                    <Switch
                        checked={this.state.tab == "country"}
                        onChange={
                            this.state.tab == "country"
                                ? this.toggleTabContinent
                                : this.toggleTabCountry
                        }
                        className={`${
                            this.state.tab != "country"
                                ? "text-gray-400 border-transparent"
                                : "text-blue-600 border-blue-600"
                        } relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs`}
                    >
                        <span>Usage By Country</span>
                    </Switch>
                </div>
                <div className='h-5/6'>
                    {this.state.tab === "continent" && (
                        <ContinentsChart
                            apiEndpoint={this.props.apiEndpoint}
                            doi={this.props.doi}
                            showTitle={false}
                        />
                    )}
                    {this.state.tab === "country" && (
                        <CountryChart
                            apiEndpoint={this.props.apiEndpoint}
                            doi={this.props.doi}
                            showTitle={false}
                        />
                    )} */}
                    <Tab.Group>
                        <Tab.List>
                            <Tab>
                                {({ selected }) => (
                                    <button
                                        className={
                                            selected
                                                ? "text-blue-600 border-blue-600 relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs"
                                                : "text-gray-400 border-transparent relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs"
                                        }
                                    >
                                        Continent
                                    </button>
                                )}
                            </Tab>
                            <Tab>
                                {({ selected }) => (
                                    <button
                                        className={
                                            selected
                                                ? "text-blue-600 border-blue-600 relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs"
                                                : "text-gray-400 border-transparent relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs"
                                        }
                                    >
                                        Country
                                    </button>
                                )}
                            </Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <ContinentsChart
                                    apiEndpoint={this.props.apiEndpoint}
                                    doi={this.props.doi}
                                    showTitle={false}
                                />
                            </Tab.Panel>
                        </Tab.Panels>
                        <Tab.Panels>
                            <Tab.Panel>
                                <CountryChart
                                    apiEndpoint={this.props.apiEndpoint}
                                    doi={this.props.doi}
                                    showTitle={false}
                                />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        );
    }
}
