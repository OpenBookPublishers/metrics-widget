import React, { useEffect } from "react";
import { Chart } from "chart.js";
import * as ChartGeo from "chartjs-chart-geo";

const Map = (props) => {
    useEffect(() => {
        const countries = ChartGeo.topojson.feature(
            props.countries,
            props.countries.objects.countries
        ).features;

        const labels = countries.map((d) => d.properties.name);
        const values = countries.map((d) => {
            let value = 0;
            props.data
                .filter(
                    (continent) => continent.country_name == d.properties.name
                )
                .map((country) =>
                    country.data.map(
                        (countryData) => (value += countryData.value)
                    )
                );

            return {
                feature: d,
                value: value,
            };
        });

        const chart = new Chart(
            document.getElementById("canvas").getContext("2d"),
            {
                type: "choropleth",
                data: {
                    labels,
                    datasets: [
                        {
                            label: "Countries",
                            data: values,
                        },
                    ],
                },
                options: {
                    showOutline: true,
                    showGraticule: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        xy: {
                            projection: "equalEarth",
                        },
                    },
                },
            }
        );
    });

    return <canvas id='canvas'></canvas>;
};

export default Map;
