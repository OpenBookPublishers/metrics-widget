import React, { Component } from "react";
import urlPropType from "url-prop-type";

function checkDOI(doi) {
    const re = /^10.\d{4,9}\/[-._\;\(\)\/:a-zA-Z0-9]+$/g;
    return re.exec(doi);
}

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
        let cleanDoi = checkDOI(props.doi);
        this.url = new URL(`${params}${cleanDoi}`, props.apiEndpoint);
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
                        {element.source} {element.value}
                    </li>
                ))}
            </ul>
        );
    }
}

export class TimelineChart extends React.Component {
    constructor(props) {
        super(props);
        let params =
            "events?aggregation=year,measure_uri&filter=work_uri:info:doi:";
        let cleanDoi = checkDOI(props.doi);
        this.url = new URL(`${params}${cleanDoi}`, props.apiEndpoint);
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
        let cleanDoi = checkDOI(props.doi);
        this.url = new URL(`${params}${cleanDoi}`, props.apiEndpoint);
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
};
