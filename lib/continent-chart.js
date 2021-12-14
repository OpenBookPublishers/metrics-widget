import React from "react";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { backgroudColours, borderColours, compareNumbers } from "./utils";
import Spinner from "./spinner";
import NoData from "./nodata";
import { DownloadMenu } from "./download-menu";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

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
        if (!dataIsLoaded) return <Spinner />;
        if (data.length == 0) return <NoData />;

        const continents = [
            ...new Set(
                data
                    .map((country) => country.continent_code)
                    .filter((continent) => continent !== null)
                    .flat()
            ),
        ];

        const valuesPerContinent = continents.map((continent) => {
            let value = 0;
            data.filter((country) => country.continent_code == continent).map(
                (country) =>
                    country.data.map(
                        (countryData) => (value += countryData.value)
                    )
            );
            return {
                continent: continent,
                value: value,
            };
        });

        // Sort from small to big with continents in place
        valuesPerContinent.sort(compareNumbers);

        // Get total for values
        let totalValues = valuesPerContinent
            .map((continent) => continent.value)
            .reduce((accumulator, currentValue) => accumulator + currentValue);

        // Get percentages
        // index needed or it will show undefined
        let percentagesPerContinent = valuesPerContinent.map(
            (continent, index) =>
                `${Math.round((continent.value / totalValues) * 100)}%`
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

        const labels = valuesPerContinent.map(
            (item, index) =>
                `${continentNames[item.continent]} (${
                    percentagesPerContinent[index]
                })`
        );

        const metrics = {
            labels,
            datasets: [
                {
                    data: valuesPerContinent.map(
                        (continent) => continent.value
                    ),
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
                    display: this.props.showTitle,
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

        return (
            <>
                <DownloadMenu data={data} fileName='usage-by-continent' />
                <Doughnut id='canvas' options={options} data={metrics} />
            </>
        );
    }
}
