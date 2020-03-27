const express = require('express');
const path = require('path');

const app = express();
const xml2js = require("xml2js");

function convertJsonToXml(mockExport) {
    const builder = new xml2js.Builder();
    const xmlToExport = builder.buildObject(mockExport);
    console.log(xmlToExport);
    writeXmlToFile(xmlToExport);
}

function writeXmlToFile(xml) {
    const fs = require("fs");
    //FIXME: using param in url to write to exportPeriod4.xml
    // write to a new file named export.xml
    fs.writeFile("export.xml", xml, err => {
        // throws an error, you could also catch it here
        if (err) throw err;
        // success case, the file was saved
        console.log("Written to file");
    });
}

app.use('/', express.static('public'));
app.use(require("body-parser").json());

app.post('/api/sendjson', function (req, res) {
    console.log(req.body); // this will output "The data you want to send to your server"
    convertJsonToXml(req.body);
    const data = { "test": "test" }
    //FIXME: error handling, send response to frontend to evaluate
    //res.status(200).send(data); // the status 200 is the default one, but this is how you can simply change it
    res.status(200).send(data);
});

app.get('/api/downloadxml', function (req, res) {
    //   res.download('export.xml', 'export.xml', function (err) {
    //     if (err) {
    //       console.log(err);
    //       // Handle error, but keep in mind the response may be partially-sent
    //       // so check res.headersSent
    //     } else {
    //       // decrement a download credit, etc.
    //       console.log("Download triggered!")
    //     }
    //   });
});

app.listen(8080, () => {
    console.log('App started and available at http://localhost:8080');
});