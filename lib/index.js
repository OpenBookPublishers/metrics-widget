import React from 'react';
import ReactDOM from 'react-dom';
import MetricsWidget from './widget';
import './index.css';

export default MetricsWidget;

export function metricsWidget(
    element,
    doi,
    apiEndpoint = 'https://metrics-api.operas-eu.org/',
    fullReportUrl = null,
) {
    ReactDOM.render(
        <MetricsWidget
            doi={doi}
            apiEndpoint={apiEndpoint}
            fullReportUrl={fullReportUrl}
        />,
        element,
    );
}
