import React, { Component } from "react";
import urlPropType from "url-prop-type";
import doiPropType from "doi-prop-type";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default class MetricsWidget extends Component {
    constructor(props) {
        super(props);
        this.toggleTabMeasures = this.toggleTabMeasures.bind(this);
        this.toggleTabTime = this.toggleTabTime.bind(this);
        this.toggleTabGeo = this.toggleTabGeo.bind(this);
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

    render() {
        return (
            <>
                <ul>
                    <li onClick={this.toggleTabMeasures}>Measures</li>
                    <li onClick={this.toggleTabTime}>Time</li>
                    <li onClick={this.toggleTabGeo}>Geo</li>
                </ul>
                <div>
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
                        <GeoMap
                            apiEndpoint={this.props.apiEndpoint}
                            doi={this.props.doi}
                        />
                    )}
                </div>
            </>
        );
    }
}

export class MeasuresGraph extends React.Component {
    constructor(props) {
        super(props);
        let params = "events?aggregation=measure_uri&filter=work_uri:info:doi:";
        this.url = new URL(`${params}${props.doi}`, props.apiEndpoint);
        this.state = {
            data: [],
            dataIsLoaded: false,
        };
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

    render() {
        const { dataIsLoaded, data } = this.state;
        if (!dataIsLoaded) return <div>Loading...</div>;

        const options = {
            indexAxis: "y",
            elements: {
                bar: {
                    borderWidth: 2,
                },
            },
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
        };

        const labels = data.map(
            (element) => `${element.source} ${element.type}`
        );

        const metrics = {
            labels,
            datasets: [
                {
                    data: data.map((element) => `${element.value}`),
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
            ],
        };
        return <Bar options={options} data={metrics} />;
    }
}

export class TimelineChart extends React.Component {
    constructor(props) {
        super(props);
        let params =
            "events?aggregation=year,measure_uri&filter=work_uri:info:doi:";
        this.url = new URL(`${params}${props.doi}`, props.apiEndpoint);
        this.state = {
            data: [],
            dataIsLoaded: false,
        };
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

    render() {
        const { dataIsLoaded, data } = this.state;
        if (!dataIsLoaded) return <div>Loading...</div>;
        return (
            <ul>
                {data.map((element) => (
                    <li>
                        {element.year} {element.data[0].source}
                    </li>
                ))}
            </ul>
        );
    }
}

export class GeoMap extends React.Component {
    constructor(props) {
        super(props);
        let params =
            "events?aggregation=country_uri,measure_uri&filter=work_uri:info:doi:";
        this.url = new URL(`${params}${props.doi}`, props.apiEndpoint);
        this.state = {
            data: [],
            dataIsLoaded: false,
        };
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

    render() {
        const { dataIsLoaded, data } = this.state;
        if (!dataIsLoaded) return <div>Loading...</div>;
        return (
            <ul>
                {data.map((element) => (
                    <li>
                        {element.country_name} {element.data[0].source}
                    </li>
                ))}
            </ul>
        );
    }
}

MetricsWidget.propTypes = {
    apiEndpoint: urlPropType.isRequired,
    doi: doiPropType.isRequired,
};
