import React from "react";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { backgroudColours, borderColours, compareNumbers } from "./utils";
import Spinner from "./spinner";
import NoData from "./nodata";
import { saveAs } from "file-saver";

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

    saveCanvas() {
        //save to png
        const canvasSave = document.getElementById("country");
        canvasSave.toBlob(function (blob) {
            saveAs(blob, "country.png");
        });
    }

    render() {
        const { dataIsLoaded, data } = this.state;
        if (!dataIsLoaded) return <Spinner />;
        if (data.length == 0) return <NoData />;

        // Get list of countries
        const countries = [
            ...new Set(
                data
                    .map((country) => country.country_name)
                    .filter((country) => country !== null)
                    .flat()
            ),
        ];

        // Get object with aggregated value per country
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
        valuesPerCountry.sort(compareNumbers);

        // A hack to allow holding of value within map
        const top10Values = [0]
            .map((i) => {
                let holder = [];
                let value = 0;
                valuesPerCountry.map((item, index) => {
                    if (index < 9) {
                        holder.push(item);
                    } else {
                        value += item.value;
                    }
                });
                holder.push({ country: "Other", value: value });
                return holder;
            })
            .flat();

        // Get total for values
        const totalValues = top10Values
            .map((country) => country.value)
            .reduce((accumulator, currentValue) => accumulator + currentValue);

        // Get percentages
        // index needed or it will show undefined
        const percentagesPerCountry = top10Values.map(
            (country, index) =>
                `${Math.round((country.value / totalValues) * 100)}%`
        );

        const labels = top10Values.map(
            (item, index) => `${item.country} (${percentagesPerCountry[index]})`
        );

        const metrics = {
            labels,
            datasets: [
                {
                    data: top10Values.map((country) => country.value),
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
                    text: "Proportion of Usage by Country",
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
                <a
                    id='download'
                    onClick={this.saveCanvas}
                    href=''
                    class='btn btn-primary float-right bg-flat-color-1'
                    title='Download as PNG'
                >
                    <i class='fa fa-download'></i>
                </a>
                <Pie id='country' options={options} data={metrics} />;
            </>
        );
    }
}
