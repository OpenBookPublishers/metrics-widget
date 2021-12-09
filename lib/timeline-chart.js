import React from "react";
import { Line } from "react-chartjs-2";
import { backgroudColours, borderColours } from "./utils";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export class TimelineChart extends React.Component {
    constructor(props) {
        super(props);
        let params =
            "events?aggregation=measure_uri,year&filter=work_uri:info:doi:";
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
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
        };

        /*
        this iterates the data and the data inside each object and 
        collects it, which returns a multidimensional array we flatten it
        so that we just have one dimension.
        But we now have duplicate years so we then convert it into a set, 
        which can only hold unique values
         */
        const labels = [
            ...new Set(
                data.map((measure) => measure.data.map((d) => d.year)).flat()
            ),
        ];

        let colourNumber = -1; // Use as an index to set colours for each dataset.

        const datasets = data.map((measure) => {
            if (colourNumber < backgroudColours.length - 1) {
                // Only check bg colour as border and bg has same number of elements
                colourNumber++;
            } else {
                colourNumber = 0; // reset
            }
            // we iterate the labels array now that we know it contains all years
            let measureData = labels.map((year) => {
                // we search for that year inside the measure's data
                let result = measure.data.filter((y) => y.year == year);
                // if the above returned a search we use it, otherwise we set it to 0
                return result.length > 0 ? result[0].value : 0;
            });

            function formatLabel(measure) {
                let source = "";
                switch (measure.source) {
                    case "Open Book Publishers":
                        source = "OBP";
                        break;
                    case "Open Book Publishers HTML Reader":
                        source = "OBP HTML Reader";
                        break;
                    case "Open Book Publishers PDF Reader":
                        source = "OBP PDF Reader";
                        break;
                    default:
                        source = measure.source;
                        break;
                }
                return `${source} ${measure.type}`;
            }

            return {
                label: formatLabel(measure),
                data: measureData,
                backgroundColor: backgroudColours[colourNumber],
                borderColor: borderColours[colourNumber],
                borderWidth: 2,
            };
        });

        const metrics = {
            labels,
            datasets,
        };

        return <Line options={options} data={metrics} />;
    }
}
