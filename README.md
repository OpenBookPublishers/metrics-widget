# Metrics Widget

This package is used to display book usage statistics, consuming a [HIRMEOS Metrics API](https://github.com/hirmeos/metrics-api).

## Installation

To install via npm:

```bash
npm install --save metrics-widget
```

To install via yarn:

```bash
yarn add metrics-widget
```

To use CDN:

```html
    <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/metrics-widget"></script>
```

## Usage

### React

```javascript
// import the widget
import MetricsWidget from 'metrics-widget';

// ...
const doi = "10.11647/obp.0001";
const apiEndpoint = "https://metrics.operas-eu.org/";
return (
  <MetricsWidget apiEndpoint={apiEndpoint} doi={doi} />
)
// ...
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Metrics Widget</title>
  <body>
    <!-- Import react and react-dom -->
    <script
      src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"
      crossorigin
    ></script>
    <script
      src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"
      crossorigin
    ></script>
    <!-- Import the metrics widget -->
    <script src="https://unpkg.com/metrics-widget@1.0.0/dist/index.js"></script>
    <div id="metrics-widget"></div>
    <script>
      let doi = "10.11647/obp.0001";
      let apiEndpoint = "https://metrics.operas-eu.org/";
      metricsWidget(document.getElementById('metrics-widget'), doi, apiEndpoint)
    </script>
  </body>
```

