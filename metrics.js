let request = {
  hostname: "",
  params: "",
  get: async function (doi) {
    try {
      const cleanDoi = checkDOI(doi);
      const url = new URL(this.hostname + this.params + cleanDoi);
      const res = await fetch(url);
      const data = await res.json();
      // check data
      await checkData(data);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};

class Metrics {
  constructor(hostname) {
    this.hostname = hostname;
  }

  async getData(doi) {
    request.hostname = this.hostname;
    request.params = "events?aggregation=measure_uri&filter=work_uri:info:doi:";
    return request.get(doi);
  }

  async getGeoData(doi) {
    request.hostname = this.hostname;
    request.params =
      "events?aggregation=country_uri,measure_uri&filter=work_uri:info:doi:";
    return request.get(doi);
  }
}

function checkDOI(doi) {
  const re = /^10.\d{4,9}\/[-._\;\(\)\/:a-zA-Z0-9]+$/g;
  return re.exec(doi);
}

function checkData(data) {
  // if data could not be retrieved (site down)
  if (!data) {
    console.error("Data could not be retrieved. Site may be down.");
    return null;
  } else if (data.code == 404) {
    // if data could not be retrieved (site up, bad query)
    console.error("Data not found. Query may be bad.");
    return null;
  } else if (data.code == 500) {
    // data could not be retrieved due to server error
    console.error("Server error.");
    return null;
  }
}

module.exports = Metrics;
