const fs = require('fs');
const pdf = require('pdf-parse');
 
async function parsePDF(fileName){
    let dataBuffer = fs.readFileSync('./PDFs/' + fileName); //change
    return pdf(dataBuffer);
    // pdf(dataBuffer).then(function(data) {
    //     console.log(data.numpages);
    //     console.log(data.numrender);
    //     console.log(data.info);
    //     console.log(data.metadata); 
    //     console.log(data.version);
    //     // PDF text
    //     console.log(data.text); 
    // });
} 

//todo one day: other file formats lol

module.exports = {
    parsePDF
}