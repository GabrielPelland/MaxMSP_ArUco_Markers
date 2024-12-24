// Import required modules
const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");
const maxAPI = require("max-api");

const port = 3000;

//-------------------- Function to serve static files --------------------
const htmlBasePath = path.join(__dirname, "../other");
const jsBasePath = path.join(__dirname, "../code");

/**
 * Serves static files based on the request URL and base directory.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {string} basePath - The base directory for static files.
 */
function serveStatic(req, res, basePath) {
    console.log(`${req.method} ${req.url}`);

    const parsedUrl = url.parse(req.url);
    let pathname = path.join(basePath, parsedUrl.pathname);

    const mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
    };

    fs.access(pathname, fs.constants.F_OK, (err) => {
        if (err) {
            res.statusCode = 404;
            res.end(`File ${pathname} not found!`);
            return;
        }

        if (fs.statSync(pathname).isDirectory()) {
            pathname = path.join(pathname, "index.html");
        }

        fs.readFile(pathname, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end(`Error reading the file: ${err}.`);
            } else {
                const ext = path.parse(pathname).ext;
                res.setHeader("Content-Type", mimeTypes[ext] || "text/plain");
                res.end(data);
            }
        });
    });
}

//-------------------- Request handling --------------------
/**
 * Handles incoming HTTP requests, serving static files or processing POST data.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 */
const requestHandler = (request, response) => {
    if (request.method === "GET") {
        if (request.url.endsWith(".js")) {
            serveStatic(request, response, jsBasePath);
        } else {
            serveStatic(request, response, htmlBasePath);
        }
    } else if (request.method === "POST") {
        const parsedUrl = url.parse(request.url);
        const pathname = parsedUrl.pathname;

        if (pathname.startsWith("/qr/")) {
            let body = [];

            request
                .on("data", (chunk) => {
                    body.push(chunk);
                })
                .on("end", () => {
                    body = Buffer.concat(body).toString();
                    try {
                        const data = JSON.parse(body);
                        const { id, x, y, r } = data;

                        const outputDictionary = {
                            [id]: { x, y, r },
                        };

                        maxAPI.outlet(outputDictionary);
                        response.end("success");
                    } catch (err) {
                        response.statusCode = 500;
                        response.end(`Invalid JSON body: ${err}.`);
                    }
                });
        } else {
            response.statusCode = 404;
            response.end("Not Found");
        }
    } else {
        response.statusCode = 405; // Method Not Allowed
        response.end("Method Not Allowed");
    }
};

//-------------------- Server setup --------------------
const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        console.error("Server startup error:", err);
    } else {
        console.log(`Server is listening on port ${port}`);
    }
});
