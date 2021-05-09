const express = require('express')
const router = express.Router()
const fs = require('fs');
const helpers = require('../../helpers/index')
const parse = require('../../helpers/parse')
const entityAnalysis = require('../../helpers/entity-analysis')

router.get('/', async (req, res) => {
    try {
        if(!req.session.fileName) {
            return res.status(400).json({errors: [{msg: 'No files linked with the current user. Please upload a file before accessing this route.'}]})
        }
        console.log("accessing file: ", req.session.fileName)
        
        let keywordJson;
        let getPrompt;
        parse.parsePDF(fileName, ()=>{ //god why
            fs.readFile(process.env.PWD + '/PDFs/'+ fileName + '.txt', async (err, data)=>{
                keywordJson = await entityAnalysis.analyze(data.toString(), async (kj)=>{
                    getPrompt = await helpers.getQuestions(kj);
                });
                // console.log("here now" + keywordJson)
            });
        })
        // const getQuestions = await helpers.getQuestions(keywordJson);

        // res.json({questions: ['Placeholder question 1', 'Placeholder question 2', 'Placeholder question 3']})
        res.json(getPrompt)

    } catch (err) {
        console.error(err.message)
        res.status(500).json({errors: [{msg: 'Server error'}]})
    }
});

module.exports = router