import React from "react";
import { Bar } from "react-chartjs-2";
import {backgroudColours, borderColours, fallbackContent, formatLabel} from "./utils";
import { DownloadMenu } from "./download-menu";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Spinner from "./spinner";
import NoData from "./nodata";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

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
        if (!dataIsLoaded) return <Spinner />;
        if (data.length == 0) return <NoData />;

        const title = "Usage by Measure";

        const options = {
            indexAxis: "y",
            elements: {
                bar: {
                    borderWidth: 2,
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    text: title,
                    display: true,
                },
                legend: {
                    display: false,
                },
            },
        };

        const labels = data.map((item, index) => formatLabel(item, index));

        const metrics = {
            labels,
            datasets: [
                {
                    data: data.map((element) => `${element.value}`),
                    backgroundColor: backgroudColours,
                    borderColor: borderColours,
                    borderWidth: 1,
                },
            ],
        };

        const csvData = data.map((item) => {
            return {
                measure_uri: item.measure_uri,
                namespace: item.namespace,
                source: item.source,
                type: item.type,
                version: item.version,
                value: item.value,
            };
        });

        return (
            <div className='h-full w-full relative'>
                <div className='flex justify-end absolute right-0'>
                    <DownloadMenu data={csvData} fileName='usage-by-measure' />
                </div>
                <Bar
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
