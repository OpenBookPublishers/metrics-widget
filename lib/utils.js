import PropTypes from 'prop-types';
import urlPropType from 'url-prop-type';

// colour blind friendly colour scheme
export const backgroundColours = [
    'rgba(17, 112, 170, 0.7)',
    'rgba(252, 125, 11, 0.7)',
    'rgba(163, 172, 185, 0.7)',
    'rgba(87, 96, 108, 0.7)',
    'rgba(95, 162, 206, 0.7)',
    'rgba(200, 82, 0, 0.7)',
    'rgba(123, 132, 143, 0.7)',
    'rgba(163, 204, 233, 0.7)',
    'rgba(255, 188, 121, 0.7)',
    'rgba(200, 208, 217, 0.7)',
];

export const borderColours = [
    'rgba(17, 112, 170, 1)',
    'rgba(252, 125, 11, 1)',
    'rgba(163, 172, 185, 1)',
    'rgba(87, 96, 108, 1)',
    'rgba(95, 162, 206, 1)',
    'rgba(200, 82, 0, 1)',
    'rgba(123, 132, 143, 1)',
    'rgba(163, 204, 233, 1)',
    'rgba(255, 188, 121, 1)',
    'rgba(200, 208, 217, 1)',
];

export function formatLabel(item) {
    const re = /open book publishers/gi;

    const sentence = `${item.source.replace(re, 'OBP')} ${item.type}`;

    const words = sentence.split(' ');

    const text = words
        .map((word) => word[0].toUpperCase() + word.substring(1))
        .join(' ');

    return text;
}

// For sorting
export function compareNumbers(a, b) {
    if (a.value > b.value) {
        return -1;
    }
    if (a.value < b.value) {
        return 1;
    }
    return 0;
}

export const metricsDataPropType = PropTypes.shape({
    measure_uri: urlPropType.isRequired,
    namespace: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    year: PropTypes.number,
    continent: PropTypes.string,
    country: PropTypes.string,
});

export const fallbackContent = 'Your browser does not support the canvas element.';
