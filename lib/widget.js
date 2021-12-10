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
import { ContinentsChart } from "./continent-chart";
import { Information } from "./information";

export default class MetricsWidget extends Component {
    constructor(props) {
        super(props);
        this.toggleTabMeasures = this.toggleTabMeasures.bind(this);
        this.toggleTabTime = this.toggleTabTime.bind(this);
        this.toggleTabGeo = this.toggleTabGeo.bind(this);
        this.toggleTabInfo = this.toggleTabInfo.bind(this);
        this.state = { tab: "measures" };
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

    openInNewTab = (url) => {
        const newWindow = window.open(url, "_self", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
    };

    render() {
        return (
            <div className='bg-gray-100 w-full bg-white text-gray-800 overflow-hidden border-2 border-gray-200 rounded-2xl'>
                <div className='bg-white text-center px-4 py-2 w-full'>
                    <span className='block py-1 text-md text-gray-600 font-semibold'>
                        Metrics
                    </span>
                </div>
                <div className='p-2 h-96 w-full border-gray-200 border-t-2 border-b-2'>
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
                        <ContinentsChart
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
                <div className='flex bg-white'>
                    <div className='flex-1 group'>
                        <div
                            onClick={this.toggleTabMeasures}
                            className={`${
                                this.state.tab === "measures"
                                    ? "text-blue-600 border-blue-600"
                                    : "text-gray-400 border-transparent"
                            } flex items-end justify-center text-center mx-auto cursor-pointer md:px-4 py-2 w-full group-hover:text-blue-600 border-b-2 group-hover:border-blue-600`}
                        >
                            <span className='block px-1'>
                                <ChartBarIcon className='h-6 w-6 pt-1 mb-1 mx-auto block' />
                                <span className='block text-xs pb-1'>
                                    Measures
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className='flex-1 group'>
                        <div
                            onClick={this.toggleTabTime}
                            className={`${
                                this.state.tab === "time"
                                    ? "text-blue-600 border-blue-600"
                                    : "text-gray-400 border-transparent"
                            } flex items-end justify-center text-center mx-auto cursor-pointer md:px-4 py-2 w-full group-hover:text-blue-600 border-b-2 group-hover:border-blue-600`}
                        >
                            <span className='block px-1'>
                                <TrendingUpIcon className='h-6 w-6 pt-1 mb-1 mx-auto block' />
                                <span className='block text-xs pb-1'>
                                    Timeline
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className='flex-1 group'>
                        <div
                            onClick={this.toggleTabGeo}
                            className={`${
                                this.state.tab === "geo"
                                    ? "text-blue-600 border-blue-600"
                                    : "text-gray-400 border-transparent"
                            } flex items-end justify-center text-center mx-auto cursor-pointer md:px-4 py-2  w-full group-hover:text-blue-600 border-b-2 group-hover:border-blue-600`}
                        >
                            <span className='block px-1'>
                                <GlobeIcon className='h-6 w-6 pt-1 mb-1 mx-auto block' />
                                <span className='block text-xs pb-1'>
                                    Continents
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className='flex-1 group'>
                        <div
                            onClick={this.toggleTabInfo}
                            className={`${
                                this.state.tab === "info"
                                    ? "text-blue-600 border-blue-600"
                                    : "text-gray-400 border-transparent"
                            } flex items-end justify-center text-center mx-auto cursor-pointer md:px-4 py-2  w-full text-gray-400 group-hover:text-blue-600 border-b-2 border-transparent group-hover:border-blue-600`}
                        >
                            <span className='block px-1'>
                                <InformationCircleIcon className='h-6 w-6 pt-1 mb-1 mx-auto block' />
                                <span className='block text-xs pb-1'>
                                    Information
                                </span>
                            </span>
                        </div>
                    </div>
                    {this.props.fullReportUrl && (
                        <div className='flex-1 group'>
                            <div
                                onClick={() =>
                                    this.openInNewTab(this.props.fullReportUrl)
                                }
                                className='flex items-end justify-center text-center mx-auto cursor-pointer md:px-4 py-2  w-full text-gray-400 group-hover:text-blue-600 border-b-2 border-transparent group-hover:border-blue-600'
                            >
                                <span className='block px-1'>
                                    <DocumentReportIcon className='h-6 w-6 pt-1 mb-1 mx-auto block' />
                                    <span className='block text-xs pb-1'>
                                        Full Report
                                    </span>
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

MetricsWidget.propTypes = {
    apiEndpoint: urlPropType.isRequired,
    doi: doiPropType.isRequired,
    fullReportUrl: urlPropType,
};
