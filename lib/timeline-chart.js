import React from "react";
import { Line } from "react-chartjs-2";
import { backgroudColours, borderColours, formatLabel } from "./utils";
import { saveAs } from "file-saver";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Spinner from "./spinner";
import NoData from "./nodata";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
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

    saveCanvas() {
        //save to png
        const canvasSave = document.getElementById("timeline");
        canvasSave.toBlob(function (blob) {
            saveAs(blob, "timeline.png");
        });
    }

    render() {
        const { dataIsLoaded, data } = this.state;
        if (!dataIsLoaded) return <Spinner />;
        if (data.length == 0) return <NoData />;

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    text: "Timeline of Usage by Measure",
                    display: true,
                },
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

        return (
            <>
                <a
                    onClick={this.saveCanvas}
                    class='btn btn-primary float-right bg-flat-color-1'
                    title='Download as PNG'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='btn btn-primary float-right bg-flat-color-1 h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                    >
                        <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                    </svg>
                </a>
                <Line id='timeline' options={options} data={metrics} />
            </>
        );
    }
}
