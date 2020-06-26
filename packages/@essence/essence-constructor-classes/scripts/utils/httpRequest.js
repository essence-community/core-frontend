/* eslint-disable @typescript-eslint/no-var-requires */
const http = require("http");
const url = require("url");

const {GATE_URL} = process.env;

if (!GATE_URL) {
    throw new Error("GATE_URL should be set in env");
}

function httpRequest(query, postData) {
    const {port, hostname, path} = url.parse(`${GATE_URL}?${query}`);

    return new Promise(function(resolve, reject) {
        const req = http.request(
            {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                },
                hostname,
                method: "POST",
                path,
                port,
            },
            function(res) {
                // reject on bad status
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error("statusCode=" + res.statusCode));
                }
                // cumulate data
                let body = [];

                res.on("data", function(chunk) {
                    body.push(chunk);
                });
                // resolve on end
                res.on("end", function() {
                    try {
                        body = JSON.parse(Buffer.concat(body).toString());
                    } catch (e) {
                        reject(e);
                    }
                    resolve(body);
                });
            },
        );

        // reject on request error
        req.on("error", function(err) {
            reject(err);
        });

        if (postData) {
            req.write(postData);
        }

        req.end();
    });
}

module.exports = httpRequest;
