# Metrics Widget

[![npm](https://img.shields.io/npm/v/metrics-widget.svg)](https://www.npmjs.com/package/metrics-widget)
![GitHub](https://img.shields.io/github/license/OpenBookPublishers/metrics-widget)


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
<script src="https://unpkg.com/metrics-widget@1/dist/index.js"></script>
<link rel="stylesheet" href="https://unpkg.com/metrics-widget@1/dist/index.css">
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
    <!-- Import metrics widget -->
    <script src="https://unpkg.com/metrics-widget@1/dist/index.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/metrics-widget@1/dist/index.css">
    <!-- Render widget -->
    <div id="metrics-widget"></div>
    <script>
      let doi = "10.11647/obp.0001";
      let apiEndpoint = "https://metrics-api.operas-eu.org/";
      metricsWidget(document.getElementById('metrics-widget'), doi, apiEndpoint)
    </script>
  </body>
</html>
```

