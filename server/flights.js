var https = require("https");

var options = {
  method: "GET",
  hostname: "api.schiphol.nl",
  port: null,
  path: "/public-flights/flights", // Add your path here
  headers: {
    resourceversion: "v4",
    app_id: "ab593425", // Your App ID
    app_key: "7011bd753c0c63cea48fd42a7f64a6d9", // Your App Key
  },
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
