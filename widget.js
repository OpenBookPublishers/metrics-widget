const Metrics = require("./metrics.js");

function showWithGeoData(data) {
  let showData = []; // array to hold html lists
  let count = Object.keys(data.data).length; // store number of objects in data
  for (let i = 0; i < count; ++i) {
    showData.push(`<li>${data.data[i].country_name}</li>`); // create html list, shows country name

    for (let j = 0; j < Object.keys(data.data[i].data).length; ++j) {
      // iterate through objects stored inside data.data[i] which contain source, type, value etc
      showData.push(
        `<li>${data.data[i].data[j].source} ${data.data[i].data[j].type} ${data.data[i].data[j].value}</li>`
      );
    }
  }
  // return the list
  return showData.join("\n");
}

function showWithoutGeoData(data) {
  // returns a list of values
  const showData = data.data
    .map(
      (
        outer // outer to access country_uri, country_name etc
      ) => `<li>${outer.source} ${outer.type} ${outer.value}</li>`
    )
    .join("\n");
  // return the list
  return showData;
}

export default function showWidget() {
  let metrics = new Metrics("https://metrics.api.openbookpublishers.com/");
  metrics.getGeoData("10.11647/obp.0020").then((data) => {
    main.innerHTML = showWithGeoData(data);
  });

  metrics.getData("10.11647/obp.0020").then((data) => {
    nogeo.innerHTML = showWithoutGeoData(data);
  });

  return (
    // id="main" needed for main.innerHTML to show data
    <>
      <div id="main"></div>
      <p></p>
      <div id="nogeo"></div>
    </>
  );
}
