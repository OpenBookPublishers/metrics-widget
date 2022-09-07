import React from 'react';
import {
    Chart as ChartJS, ArcElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import urlPropType from 'url-prop-type';
import doiPropType from 'doi-prop-type';
import {
    backgroudColours, borderColours, compareNumbers, fallbackContent,
} from './utils';
import Spinner from './spinner';
import NoData from './nodata';
import DownloadMenu from './download-menu';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

export default class ContinentsChart extends React.Component {
    constructor(props) {
        super(props);
        const params = 'events?aggregation=country_uri,measure_uri&filter=work_uri:info:doi:';
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
        if (data.length === 0) return <NoData />;

        const title = 'Proportion of Usage by Continent';
        const { showTitle } = this.props;

        const continents = [
            ...new Set(
                data
                    .map((country) => country.continent_code)
                    .filter((continent) => continent !== null)
                    .flat(),
            ),
        ];

        const valuesPerContinent = continents.map((continent) => {
            let value = 0;
            data.filter((country) => country.continent_code === continent).map(
                (country) => country.data.forEach((countryData) => {
                    value += countryData.value;
                }),
            );
            return {
                continent,
                value,
            };
        });

        // Sort from small to big with continents in place
        valuesPerContinent.sort(compareNumbers);

        // Get total for values
        const totalValues = valuesPerContinent
            .map((continent) => continent.value)
            .reduce((accumulator, currentValue) => accumulator + currentValue);

        // Get percentages
        // index needed or it will show undefined
        const percentagesPerContinent = valuesPerContinent.map(
            (continent) => `${Math.round((continent.value / totalValues) * 100)}%`,
        );

        const continentNames = {
            EU: 'Europe',
            AS: 'Asia',
            NA: 'North America',
            AF: 'Africa',
            SA: 'South America',
            OC: 'Oceania',
            AN: 'Antarctica',
        };

        const labels = valuesPerContinent.map(
            (item, index) => `${continentNames[item.continent]} (${
                percentagesPerContinent[index]
            })`,
        );

        const metrics = {
            labels,
            datasets: [
                {
                    data: valuesPerContinent.map(
                        (continent) => continent.value,
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
                    text: title,
                    display: showTitle,
                },
                tooltip: {
                    callbacks: {
                        label: (ttItem) => ttItem.label,
                    },
                },
                legend: {
                    position: 'left',
                    align: 'center',
                },
            },
        };

        const csvData = data
            .map((item) => {
                const obj = item.data.map((element) => ({
                    measure_uri: element.measure_uri,
                    namespace: element.namespace,
                    source: element.source,
                    type: element.type,
                    version: element.version,
                    continent: item.continent_code,
                    country: item.country_name,
                    value: element.value,
                }));
                return obj;
            })
            .flat();

        return (
            <div className="h-full w-full relative">
                <div className="flex justify-end absolute right-0 -top-12">
                    <DownloadMenu
                        data={csvData}
                        fileName="usage-by-continent"
                    />
                </div>
                <Doughnut
                    id="canvas"
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

ContinentsChart.propTypes = {
    apiEndpoint: urlPropType.isRequired,
    doi: doiPropType.isRequired,
    showTitle: PropTypes.bool.isRequired,
};
