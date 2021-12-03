class Metrics {
    constructor(hostname, params, doi) {
        const cleanDoi = checkDOI(doi);
        this.url = new URL(hostname + params + cleanDoi);
    }

    async getData() {
        try {
            const res = await fetch(this.url);
            const data = await res.json();
            // check data
            await checkData(data);
            return data;
        } catch (e) {
            return {
                notFound: true,
            };
        };
    }
}

function checkDOI(doi) {
    const re = /^10.\d{4,9}\/[-._\;\(\)\/:a-zA-Z0-9]+$/g;
    return re.exec(doi);
}

function checkData(data) {
    // if data could not be retrieved (site down)
    if (!data) {
        return {
            notFound: true,
        };

    } else if (data.code == 404) {
        // if data could not be retrieved (site up, bad query)
        return {
            notFound: true,
        };

    } else if (data.code == 500) {
        // data could not be retrieved due to timeout
        return {
            notFound: true,
        };
    };
}

function showWithGeoData(data) {
    let showData = [] // array to hold html lists
    let count = Object.keys(data.data).length; // store number of objects in data
    for (let i = 0; i < count; ++i) {
        showData.push(`<li>${data.data[i].country_name}</li>`) // create html list, shows country name

        for (let j = 0; j < Object.keys(data.data[i].data).length; ++j) { // iterate through objects stored inside data.data[i] which contain source, type, value etc
            showData.push(`<li>${data.data[i].data[j].source} ${data.data[i].data[j].type} ${data.data[i].data[j].value}</li>`)
        }
    }
    // return the list
    return showData.join("\n");
}

function showWithoutGeoData(data) {
    // returns a list of values
    const showData = data.data.map((outer) => // outer to access country_uri, country_name etc
        `<li>${outer.source} ${outer.type} ${outer.value}</li>`).join("\n");
    // return the list
    return showData;
}

export default function showWidget() {
    let metricsWithGeo = new Metrics('https://metrics.api.openbookpublishers.com/', 'events?aggregation=country_uri,measure_uri&filter=work_uri:info:doi:', '10.11647/obp.0020');
    let metricsNoGeo = new Metrics('https://metrics.api.openbookpublishers.com/', 'events?aggregation=measure_uri&filter=work_uri:info:doi:', '10.11647/obp.0020');

    metricsWithGeo.getData().then(data => {
        main.innerHTML = showWithGeoData(data);
    });

    metricsNoGeo.getData().then(data => {
        nogeo.innerHTML = showWithoutGeoData(data);
    });

    return (
        // id="main" needed for main.innerHTML to show data
        <>
            <div id="main">
            </div>
            <p></p>
            <div id="nogeo">
            </div>
        </>
    );
}