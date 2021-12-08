import React from "react";
import { Bar } from "react-chartjs-2";
import { backgroudColours, borderColours } from "./utils";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

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
                    backgroundColor: backgroudColours,
                    borderColor: borderColours,
                },
            ],
        };
        return <Bar options={options} data={metrics} />;
    }
}
