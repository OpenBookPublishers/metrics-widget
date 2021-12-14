import React from "react";
import { Bar } from "react-chartjs-2";
import { backgroudColours, borderColours, formatLabel } from "./utils";
import { saveAs } from "file-saver";

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

    saveCanvas() {
        //save to png
        const canvasSave = document.getElementById("measures");
        canvasSave.toBlob(function (blob) {
            saveAs(blob, "measures.png");
        });
    }

    render() {
        const { dataIsLoaded, data } = this.state;
        if (!dataIsLoaded) return <Spinner />;
        if (data.length == 0) return <NoData />;

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
                    text: "Usage by Measure",
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
                <Bar id='measures' options={options} data={metrics} />;
            </>
        );
    }
}
