import React from "react";
import Spinner from "./spinner";
import NoData from "./nodata";
import Map from "./map.js";

export class MapChart extends React.Component {
    constructor(props) {
        super(props);
        let params =
            "events?aggregation=country_uri,measure_uri&filter=work_uri:info:doi:";
        this.url = new URL(`${params}${props.doi}`, props.apiEndpoint);
        this.state = {
            data: [],
            countries: [],
            dataIsLoaded: false,
        };
    }

    componentDidMount() {
        fetch(this.url)
            .then((res) => res.json())
            .then((json) => {
                fetch("https://unpkg.com/world-atlas/countries-110m.json")
                    .then((countries) => countries.json())
                    .then((jsonCountries) =>
                        this.setState({
                            data: json.data,
                            countries: jsonCountries,
                            dataIsLoaded: true,
                        })
                    );
            });
    }

    render() {
        const { dataIsLoaded, countries, data } = this.state;
        if (!dataIsLoaded) return <Spinner />;
        if (data.length == 0) return <NoData />;

        return <Map data={data} countries={countries} />;
    }
}
