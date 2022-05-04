import React from "react";
import { Line } from "react-chartjs-2";
import {backgroudColours, borderColours, fallbackContent, formatLabel} from "./utils";
import { DownloadMenu } from "./download-menu";

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

    render() {
        const { dataIsLoaded, data } = this.state;
        if (!dataIsLoaded) return <Spinner />;
        if (data.length == 0) return <NoData />;

        const title = "Timeline of Usage by Measure";

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    text: title,
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
        ].sort();

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

        const csvData = data
            .map((item) => {
                let obj = item.data.map((element) => {
                    return {
                        measure_uri: item.measure_uri,
                        namespace: item.namespace,
                        source: item.source,
                        type: item.type,
                        version: item.version,
                        year: element.year,
                        value: element.value,
                    };
                });
                return obj;
            })
            .flat();

        return (
            <div className='h-full w-full relative'>
                <div className='flex justify-end absolute right-0'>
                    <DownloadMenu
                        data={csvData}
                        fileName='timeline-of-usage-by-measure'
                    />
                </div>
                <Line
                    id='canvas'
                    options={options}
                    data={metrics}
                    role="img"
                    aria-label={title}
                    fallbackContent={fallbackContent}
                />
            </div>
        );
    }
}
