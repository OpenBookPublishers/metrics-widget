import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { backgroudColours, borderColours } from "./utils";

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

        const continents = [
            ...new Set(
                data
                    .map((c) => c.continent_code)
                    .filter((c) => c !== null)
                    .flat()
            ),
        ];

        const values = continents.map((c) => {
            let value = 0;
            data.filter((country) => country.continent_code == c).map(
                (country) => country.data.map((m) => (value += m.value))
            );
            return value;
        });

        // Get total for values
        let total = values.reduce(
            (accumulator, currentValue) => accumulator + currentValue
        );

        // Get percentages
        // index needed or it will show undefined
        let percentages = values.map(
            (value, index) => `${Math.round((value / total) * 100)}%`
        );

        // Create labels with percentages instead of numbers
        // item needed or it will show undefined
        function formatLabel(item, index) {
            let continent = "";
            switch (continents[index]) {
                case "EU":
                    continent = "Europe";
                    break;
                case "AS":
                    continent = "Asia";
                    break;
                case "NA":
                    continent = "North America";
                    break;
                case "AF":
                    continent = "Africa";
                    break;
                case "SA":
                    continent = "South America";
                    break;
                case "OC":
                    continent = "Oceania";
                    break;
                case "AN":
                    continent = "Antarctica";
                    break;
                default:
                    continent = continents[index];
                    break;
            }
            return `${continent} ${percentages[index]}`;
        }

        const labels = values.map((item, index) => formatLabel(item, index));

        const metrics = {
            labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: backgroudColours,
                    borderColor: borderColours,
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (ttItem) => ttItem.label,
                    },
                },
            },
        };

        return <Doughnut options={options} data={metrics} />;
    }
}
