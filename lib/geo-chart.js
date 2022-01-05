import React, { Component } from "react";
import { ContinentsChart } from "./continent-chart";
import { CountryChart } from "./country-chart";
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
                <Tab.Group>
                    <Tab.List className='flex items-center justify-center mb-4'>
                        <Tab>
                            {({ selected }) => (
                                <button
                                    className={
                                        selected
                                            ? "text-blue-600 border-blue-600 relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs"
                                            : "text-gray-400 border-transparent relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs"
                                    }
                                >
                                    Usage By Continent
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
                                    Usage By Country
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
                                    Usage By Country On Map
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className='h-5/6'>
                        <Tab.Panel>
                            <ContinentsChart
                                apiEndpoint={this.props.apiEndpoint}
                                doi={this.props.doi}
                                showTitle={false}
                            />
                        </Tab.Panel>
                        <Tab.Panel>
                            <CountryChart
                                apiEndpoint={this.props.apiEndpoint}
                                doi={this.props.doi}
                                showTitle={false}
                            />
                        </Tab.Panel>
                        <Tab.Panel>
                            <MapChart
                                apiEndpoint={this.props.apiEndpoint}
                                doi={this.props.doi}
                                showTitle={false}
                            />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        );
    }
}
