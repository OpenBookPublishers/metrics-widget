import React, { Component } from 'react';

export default class MetricsWidget extends Component {
    constructor(props) {
        super(props);
        this.toggleTabMeasures = this.toggleTabMeasures.bind(this);
        this.toggleTabTime = this.toggleTabTime.bind(this);
        this.toggleTabGeo = this.toggleTabGeo.bind(this);
        this.state = {tab: "measures"};
    }

    toggleTabMeasures() {
        this.setState({tab: "measures"});
    }

    toggleTabTime() {
        this.setState({tab: "time"});
    }

    toggleTabGeo() {
        this.setState({tab: "geo"});
    }

    render () {
        return (
            <>
                <ul>
                    <li onClick={this.toggleTabMeasures}>Measures</li>
                    <li onClick={this.toggleTabTime}>Time</li>
                    <li onClick={this.toggleTabGeo}>Geo</li>
                </ul>
                <div>
                    {this.state.tab === 'measures' && <MeasuresGraph />}
                </div>
            </>
        )

    }
}

export class MeasuresGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            dataIsLoaded: false
        };
    }

    componentDidMount() {
        fetch("https://metrics.api.openbookpublishers.com/events?aggregation=measure_uri&filter=work_uri:info:doi:10.11647/obp.0020")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    data: json.data,
                    dataIsLoaded: true
                });
            })
    }

    render() {
        const { dataIsLoaded, data } = this.state;
        if (!dataIsLoaded) return (<div>Loading...</div>);

        return (
            <ul>
                {
                    data.map((element) => (
                        <li>{element.value}</li>
                    ))
                }
            </ul>
        );
    }
}
