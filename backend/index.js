const express = require('express')
const app = express()

require('dotenv').config({path: '.env'})

// init middleware
app.use(express.json({extended: false}))

app.get('/', (req, res) => {
    res.send('api running lol')
})

app.use('/api/pdf', require('./routes/api/pdf'))
app.use('/api/transcipt', require('./routes/api/transcript'))

// @route  GET invalid routes
// @desc   Display page not found message
// @access Public
app.get('*', (req, res) => {
	res.status(404).send('404');
});

app.listen(3001, () => {
    console.log(`Listening on port 3001`)
})