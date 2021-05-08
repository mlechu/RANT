const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    try {
        if(!req.session.fileName) {
            return res.status(400).json({errors: [{msg: 'No files linked with the current user. Please upload a file before accessing this route.'}]})
        }
        console.log("accessing file: ", req.session.fileName)
        // TODO parse pdf function.
        // TODO from the parsed data, get questions from OpenAI

        res.json({questions: ['Placeholder question 1', 'Placeholder question 2', 'Placeholder question 3']})
    } catch (err) {
        console.error(err.message)
        res.status(500).json({errors: [{msg: 'Server error'}]})
    }
});
  
module.exports = router