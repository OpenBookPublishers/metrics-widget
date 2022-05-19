import React, { Component } from "react";
import urlPropType from "url-prop-type";
import doiPropType from "doi-prop-type";

import {
    ChartBarIcon,
    DocumentReportIcon,
    GlobeIcon,
    InformationCircleIcon,
    TrendingUpIcon,
} from "@heroicons/react/outline";
import { MeasuresGraph } from "./measures-graph";
import { TimelineChart } from "./timeline-chart";
import { GeoChart } from "./geo-chart";
import { Information } from "./information";

export default class MetricsWidget extends Component {
    constructor(props) {
        super(props);
        this.toggleTabMeasures = this.toggleTabMeasures.bind(this);
        this.toggleTabTime = this.toggleTabTime.bind(this);
        this.toggleTabGeo = this.toggleTabGeo.bind(this);
        this.toggleTabInfo = this.toggleTabInfo.bind(this);
        this.state = { tab: "measures", data: [], dataIsLoaded: false };

        let params = "events?aggregation=measure_uri&filter=work_uri:info:doi:";
        this.url = new URL(`${params}${props.doi}`, props.apiEndpoint);
    }

    componentDidMount() {
        fetch(this.url)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    data: json.data,
                    dataIsLoaded: true,
                });
            });
    }

    toggleTabMeasures() {
        this.setState({ tab: "measures" });
    }

    toggleTabTime() {
        this.setState({ tab: "time" });
    }

    toggleTabGeo() {
        this.setState({ tab: "geo" });
    }

    toggleTabInfo() {
        this.setState({ tab: "info" });
    }

    render() {
        const { dataIsLoaded, data } = this.state;
        if (!dataIsLoaded || data.length == 0) return null;

        return (
            <div
                className='bg-gray-100 w-full text-gray-900 overflow-hidden border-2 border-gray-200
                           dark:border-gray-400 rounded-2xl'
            >
                <div className='bg-white dark:bg-gray-700 text-center px-4 py-2 w-full'>
                    <span className='block py-1 text-md text-gray-700 dark:text-gray-200 font-semibold'>
                        Metrics
                    </span>
                </div>
                <div className='p-2 h-96 w-full border-gray-200 dark:border-gray-400 border-t-2 border-b-2'>
                    {this.state.tab === "measures" && (
                        <MeasuresGraph
                            apiEndpoint={this.props.apiEndpoint}
                            doi={this.props.doi}
                        />
                    )}
                    {this.state.tab === "time" && (
                        <TimelineChart
                            apiEndpoint={this.props.apiEndpoint}
                            doi={this.props.doi}
                        />
                    )}
                    {this.state.tab === "geo" && (
                        <GeoChart
                            apiEndpoint={this.props.apiEndpoint}
                            doi={this.props.doi}
                        />
                    )}
                    {this.state.tab === "info" && (
                        <Information
                            apiEndpoint={this.props.apiEndpoint}
                            doi={this.props.doi}
                        />
                    )}
                </div>
                <div className='flex bg-white dark:bg-gray-700'>
                    <div className='flex-1 group'>
                        <div
                            onClick={this.toggleTabMeasures}
                            tabIndex="0"
                            role="button"
                            className={`${
                                this.state.tab === "measures"
                                    ? "text-blue-600 border-blue-600 dark:text-blue-300 dark:border-blue-300"
                                    : "text-gray-500 dark:text-gray-200 border-transparent"
                            } flex items-end justify-center text-center mx-auto cursor-pointer lg:px-4 py-2 
                              w-full group-hover:text-blue-600 dark:group-hover:text-blue-300 border-b-2
                              group-hover:border-blue-600 dark:group-hover:border-blue-300`}
                        >
                            <span className='block px-1'>
                                <ChartBarIcon
                                    className='h-8 w-8 lg:h-6 lg:w-6 pt-1 mb-1 mx-auto block'
                                    aria-label="Measures"
                                />
                                <span className='lg:block text-xs pb-1 hidden'>
                                    Measures
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className='flex-1 group'>
                        <div
                            onClick={this.toggleTabTime}
                            tabIndex="0"
                            role="button"
                            className={`${
                                this.state.tab === "time"
                                    ? "text-blue-600 border-blue-600 dark:text-blue-300 dark:border-blue-300"
                                    : "text-gray-500 dark:text-gray-200 border-transparent"
                            } flex items-end justify-center text-center mx-auto cursor-pointer lg:px-4 py-2 
                              w-full group-hover:text-blue-600 dark:group-hover:text-blue-300 border-b-2
                              group-hover:border-blue-600 dark:group-hover:border-blue-300`}
                        >
                            <span className='block px-1'>
                                <TrendingUpIcon
                                    className='h-8 w-8 lg:h-6 lg:w-6 pt-1 mb-1 mx-auto block'
                                    aria-label="Timeline"
                                />
                                <span className='lg:block text-xs pb-1 hidden'>
                                    Timeline
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className='flex-1 group'>
                        <div
                            onClick={this.toggleTabGeo}
                            tabIndex="0"
                            role="button"
                            className={`${
                                this.state.tab === "geo"
                                    ? "text-blue-600 border-blue-600 dark:text-blue-300 dark:border-blue-300"
                                    : "text-gray-500 dark:text-gray-200 border-transparent"
                            } flex items-end justify-center text-center mx-auto cursor-pointer lg:px-4 py-2 
                              w-full group-hover:text-blue-600 dark:group-hover:text-blue-300 border-b-2
                              group-hover:border-blue-600 dark:group-hover:border-blue-300`}
                        >
                            <span className='block px-1'>
                                <GlobeIcon
                                    className='h-8 w-8 lg:h-6 lg:w-6 pt-1 mb-1 mx-auto block'
                                    aria-label="Geographical"
                                />
                                <span className='lg:block text-xs pb-1 hidden'>
                                    Geographical
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className='flex-1 group'>
                        <div
                            onClick={this.toggleTabInfo}
                            tabIndex="0"
                            role="button"
                            className={`${
                                this.state.tab === "info"
                                    ? "text-blue-600 border-blue-600 dark:text-blue-300 dark:border-blue-300"
                                    : "text-gray-500 dark:text-gray-200 border-transparent"
                            } flex items-end justify-center text-center mx-auto cursor-pointer lg:px-4 py-2 
                              w-full group-hover:text-blue-600 dark:group-hover:text-blue-300 border-b-2
                              group-hover:border-blue-600 dark:group-hover:border-blue-300`}
                        >
                            <span className='block px-1'>
                                <InformationCircleIcon
                                    className='h-8 w-8 lg:h-6 lg:w-6 pt-1 mb-1 mx-auto block'
                                    aria-label="Information"
                                />
                                <span className='lg:block text-xs pb-1 hidden'>
                                    Information
                                </span>
                            </span>
                        </div>
                    </div>
                    {this.props.fullReportUrl && (
                        <div className='flex-1 group'>
                            <a
                                href={this.props.fullReportUrl}
                                tabIndex="0"
                                role="link"
                                className="text-gray-500 dark:text-gray-200 border-transparent flex items-end
                                           justify-center text-center mx-auto cursor-pointer lg:px-4 py-2
                                           w-full group-hover:text-blue-600 dark:group-hover:text-blue-300 border-b-2
                                           group-hover:border-blue-600 dark:group-hover:border-blue-300"
                            >
                                <span className='block px-1'>
                                    <DocumentReportIcon
                                        className='h-8 w-8 lg:h-6 lg:w-6 pt-1 mb-1 mx-auto block'
                                        aria-label="Full Report"
                                    />
                                    <span className='lg:block text-xs pb-1 hidden'>
                                        Full Report
                                    </span>
                                </span>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

MetricsWidget.defaultProps = {
    apiEndpoint: "https://metrics-api.operas-eu.org/",
};

MetricsWidget.propTypes = {
    apiEndpoint: urlPropType,
    doi: doiPropType.isRequired,
    fullReportUrl: urlPropType,
};
