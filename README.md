# Metrics Widget

[![Build](https://github.com/OpenBookPublishers/metrics-widget/actions/workflows/build_test_and_check.yml/badge.svg)](https://github.com/OpenBookPublishers/metrics-widget/actions/workflows/build_test_and_check.yml)
[![npm](https://img.shields.io/npm/v/metrics-widget.svg)](https://www.npmjs.com/package/metrics-widget)
![GitHub](https://img.shields.io/github/license/OpenBookPublishers/metrics-widget)


This package is used to display book usage statistics, consuming a [HIRMEOS Metrics API](https://github.com/hirmeos/metrics-api).

![Screenshot of Metrics Widget](https://www.openbookpublishers.com/shopimages/metrics-widget.png)

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
<script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js" crossorigin></script>
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
return (
  <MetricsWidget doi={doi} />
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
      src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"
      crossorigin
    ></script>
    <script
      src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"
      crossorigin
    ></script>
    <!-- Import metrics widget -->
    <script src="https://unpkg.com/metrics-widget@1/dist/index.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/metrics-widget@1/dist/index.css">
    <!-- Render widget -->
    <div id="metrics-widget"></div>
    <script>
      let doi = "10.11647/obp.0001";
      metricsWidget(document.getElementById('metrics-widget'), doi)
    </script>
  </body>
</html>
```

## Configuration

Both the react component and the vanilla JS function support the following parameters:


| Parameter       | Required | Default                                | Description                                         |
|-----------------|:--------:|----------------------------------------|-----------------------------------------------------|
| `doi`           | required | n/a                                    | The DOI of the work we are displaying data about.   |
| `apiEndpoint`   | optional | `"https://metrics-api.operas-eu.org/"` | The API to consume.                                 |
| `fullReportUrl` | optional | `null`                                 | Optional URL to a more detailed view of the metrics. |
