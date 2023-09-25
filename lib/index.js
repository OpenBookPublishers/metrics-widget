import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { createRoot } from 'react-dom/client';
import MetricsWidget from './widget';
import './index.css';

export default MetricsWidget;

export function metricsWidget(
    element,
    doi,
    apiEndpoint = 'https://metrics-api.operas-eu.org/',
    fullReportUrl = null,
) {
    const root = createRoot(element);
    root.render(
        <MetricsWidget
            doi={doi}
            apiEndpoint={apiEndpoint}
            fullReportUrl={fullReportUrl}
        />,
        element,
    );
}
