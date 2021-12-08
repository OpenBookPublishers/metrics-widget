import React from "react";
import { backgroudColours, borderColours } from "./utils.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export class ContinentsChart extends React.Component {
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

        const labels = [
            ...new Set(
                data
                    .map((c) => c.continent_code)
                    .filter((c) => c !== null)
                    .flat()
            ),
        ];

        const values = labels.map((c) => {
            let value = 0;
            data.filter((country) => country.continent_code == c).map(
                (country) => country.data.map((m) => (value += m.value))
            );
            return value;
        });

        const metrics = {
            labels,
            datasets: [
                {
                    data: values,
                },
            ],
        };

        return <Pie data={metrics} />;
    }
}
