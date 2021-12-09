import MetricsWidget from './widget.js';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export default MetricsWidget;

export function metricsWidget(element, doi, apiEndpoint) {
    ReactDOM.render(<MetricsWidget doi={doi} apiEndpoint={apiEndpoint} />, element);
};
