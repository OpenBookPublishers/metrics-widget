# Metrics Widget

## Usage

### On a react application

#### Install the package
```
npm install --save doi-prop-type
```

#### Example usage
```
import MetricsWidget from 'metrics-widget';

const doi = "10.11647/obp.0001";
const apiEndpoint = "https://metrics.operas-eu.org/";
// Create a generic component
const metrics = props => ( <MetricsWidget apiEndpoint={apiEndpoint} doi={doi} /> );
```
