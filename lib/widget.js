import React, { Component } from "react";
import urlPropType from "url-prop-type";
import doiPropType from "doi-prop-type";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
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
                    backgroundColor: [
                        "rgba(92, 75, 81, 0.5)",
                        "rgba(140, 190, 178, 0.5)",
                        "rgba(242, 235, 191, 0.5)",
                        "rgba(243, 181, 98, 0.5)",
                        "rgba(240, 96, 96, 0.5)",
                        "rgba(204, 232, 230, 0.5)",
                        "rgba(161, 51, 35, 0.5)",
                        "rgba(68, 212, 146, 0.5)",
                        "rgba(14, 55, 68, 0.5)",
                    ],
                    borderColor: [
                        "rgba(92, 75, 81, 0.9)",
                        "rgba(140, 190, 178, 0.9)",
                        "rgba(242, 235, 191, 0.9)",
                        "rgba(243, 181, 98, 0.9)",
                        "rgba(240, 96, 96, 0.9)",
                        "rgba(204, 232, 230, 0.9)",
                        "rgba(161, 51, 35, 0.9)",
                        "rgba(68, 212, 146, 0.9)",
                        "rgba(14, 55, 68, 0.9)",
                    ],
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
            "events?aggregation=measure_uri,year&filter=work_uri:info:doi:";
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
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
        };

        /*
        this iterates the data and the data inside each object and 
        collects it, which returns a multidimensional array we flatten it so
        that we just have one dimension.
         */
        const labels = [
            ...new Set(
                data.map((measure) => measure.data.map((d) => d.year)).flat()
            ),
        ];
        /*
        But we now have duplicate years so we then convert it into a set, 
        which can only hold unique values
        */
        const datasets = data.map((measure) => {
            // we iterate the labels array now that we know it contains all years
            let measureData = labels.map((year) => {
                // we search for that year inside the measure's data
                let result = measure.data.filter((y) => y.year == year);
                // if the above returned a search we use it, otherwise we set it to 0
                return result.length > 0 ? result[0].value : 0;
            });
            return {
                label: `${measure.source} ${measure.type}`,
                data: measureData,
                backgroundColor: "",
                borderColor: "",
            };
        });

        let backgroudColours = [
            "rgba(92, 75, 81, 0.5)",
            "rgba(140, 190, 178, 0.5)",
            "rgba(242, 235, 191, 0.5)",
            "rgba(243, 181, 98, 0.5)",
            "rgba(240, 96, 96, 0.5)",
            "rgba(204, 232, 230, 0.5)",
            "rgba(161, 51, 35, 0.5)",
            "rgba(68, 212, 146, 0.5)",
            "rgba(14, 55, 68, 0.5)",
        ];

        let borderColours = [
            "rgba(92, 75, 81, 0.5)",
            "rgba(140, 190, 178, 0.5)",
            "rgba(242, 235, 191, 0.5)",
            "rgba(243, 181, 98, 0.5)",
            "rgba(240, 96, 96, 0.5)",
            "rgba(204, 232, 230, 0.5)",
            "rgba(161, 51, 35, 0.5)",
            "rgba(68, 212, 146, 0.5)",
            "rgba(14, 55, 68, 0.5)",
        ];

        for (let i = 0; i < 9; ++i) {
            datasets[i].backgroundColor = backgroudColours[i];
            datasets[i].borderColor = borderColours[i];
        }

        const metrics = {
            labels,
            datasets,
        };

        console.log(metrics);

        return <Line options={options} data={metrics} />;
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
