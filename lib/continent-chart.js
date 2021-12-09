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
            let obj = {};
            let value = 0;
            data.filter((country) => country.continent_code == c).map(
                (country) => country.data.map((m) => (value += m.value))
            );
            obj["cont"] = c;
            obj["val"] = value;
            return obj;
        });

        function compare(a, b) {
            if (a.val < b.val) {
                return -1;
            }
            if (a.val > b.val) {
                return 1;
            }
            return 0;
        }

        values.sort(compare);

        // Get total for values
        let total = values
            .map((v) => v.val)
            .reduce((accumulator, currentValue) => accumulator + currentValue);

        // Get percentages
        // index needed or it will show undefined
        let percentages = values.map(
            (value, index) => `${Math.round((value.val / total) * 100)}%`
        );

        const continentNames = {
            EU: "Europe",
            AS: "Asia",
            NA: "North America",
            AF: "Africa",
            SA: "South America",
            OC: "Oceania",
            AN: "Antarctica",
        };

        const labels = values.map(
            (item, index) =>
                `${continentNames[item.cont]} (${percentages[index]})`
        );

        const metrics = {
            labels,
            datasets: [
                {
                    data: values.map((v) => v.val),
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
