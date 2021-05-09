const fs = require('fs');
// const pdf = require('pdf-parse');
const pdf2json = require('pdf2json');
 
// async function parsePDF(fileName){
//     let dataBuffer = fs.readFileSync('./PDFs/' + fileName); //change
//     return pdf(dataBuffer);
//     // pdf(dataBuffer).then(function(data) {
//     //     console.log(data.numpages);
//     //     console.log(data.numrender);
//     //     console.log(data.info);
//     //     console.log(data.metadata); 
//     //     console.log(data.version);
//     //     // PDF text
//     //     console.log(data.text); 
//     // });
// } 

async function parsePDF(fileName){
    pdfParser = new pdf2json(this, true);
    return new Promise((resolve, reject) => {
        fs.readFile('./PDFs/' + fileName, (err, buf) => {
            if (!err) {
                pdfParser.on('pdfParser_dataError', (errData) => {
                    console.error(errData.parserError);
                    reject(errData.parserError);
                })

                pdfParser.on('pdfParser_dataReady', (pdfData) => {
                    // txt = pdfParser.getRawTextContent()
                    // resolve(txt)
                    pages = pdfData.formImage.Pages;
                    writeToText(fileName, pages);
                    resolve(pages);
                })

                pdfParser.parseBuffer(buf);
            }
        })
    })
} 

function writeToText(fileName, pages) {
    var stream = fs.createWriteStream('./PDFs/' + fileName + '.txt', {flags:'a'});
    for (p of pages) {
        let yVal = undefined;
        for (t of p.Texts) {

            if (yVal && Math.abs(yVal - t.y) > 0.005) { // if newline
                stream.write('\n');
            }

            yVal = t.y;
            for (r of t.R) {
                stream.write(reverseEncoding(r.T) + ' '); // write the word
            }
        }
    }
    stream.end();
}

function reverseEncoding(str) {
    let out;
    try {
        out = decodeURI(str)
    } catch (err) {
        out = str;
    }
    return out
        .replace(/%2C/g,",")
        .replace(/%26/g,"&")
        .replace(/%2B/g,"+")
        .replace(/%2F/g,"/")
        .replace(/%3A/g,":")
        .replace(/%40/g,"@");
        //because decodeURI isn't doing its job!!!!!
}

//todo one day: other file formats lol

module.exports = {
    parsePDF
}