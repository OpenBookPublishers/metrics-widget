import React from "react";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { backgroudColours, borderColours, compare } from "./utils";
import Spinner from "./spinner";
import NoData from "./nodata";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

export class CountryChart extends React.Component {
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
        if (!dataIsLoaded) return <Spinner />;
        if (data.length == 0) return <NoData />;

        const countries = [
            ...new Set(
                data
                    .map((country) => country.country_name)
                    .filter((country) => country !== null)
                    .flat()
            ),
        ];

        const valuesPerCountry = countries.map((country) => {
            let value = 0;
            data.filter((continent) => continent.country_name == country).map(
                (country) =>
                    country.data.map(
                        (countryData) => (value += countryData.value)
                    )
            );

            return {
                country: country,
                value: value,
            };
        });

        // Sort from small to big with continents in place
        valuesPerCountry.sort(compare);

        // Get total for values
        let totalValues = valuesPerCountry
            .map((country) => country.value)
            .reduce((accumulator, currentValue) => accumulator + currentValue);

        // Get percentages
        // index needed or it will show undefined
        let percentagesPerCountry = valuesPerCountry.map(
            (country, index) =>
                `${Math.round((country.value / totalValues) * 100)}%`
        );

        const labels = valuesPerCountry.map(
            (item, index) =>
                `${countries[index]} (${percentagesPerCountry[index]})`
        );

        const metrics = {
            labels,
            datasets: [
                {
                    data: valuesPerCountry.map((country) => country.value),
                    backgroundColor: backgroudColours,
                    borderColor: borderColours,
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    text: "Proportion of Usage by Continent",
                    display: true,
                },
                tooltip: {
                    callbacks: {
                        label: (ttItem) => ttItem.label,
                    },
                },
                legend: {
                    position: "left",
                    align: "center",
                },
            },
        };

        return <Pie options={options} data={metrics} />;
    }
}
