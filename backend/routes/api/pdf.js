const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')
const helpers = require('../../helpers/index')

function CustomException (msg, code) {
    this.msg = msg
    this.code = code
}

router.use(fileUpload({
    createParentPath: true,
    useTempFiles : true,
    tempFileDir : '/tmp/', 
    safeFileNames: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10mb size limit
    preserveExtension: true,
    abortOnLimit: true
}));

// @route POST api/pdf
// @desc upload a file
// @access public
router.post('/', async (req, res) => {
    try {
        const fileName = await upload(req)
        console.log("File name:", fileName)

        // TODO call parse pdf function.

        res.json({fileName: fileName})
    } 
    catch (err) {
        if(err instanceof CustomException){
            res.status(err.code).json({errors: [{msg: err.msg}]})
        } else {
            console.error(err.message)
            res.status(500).json({errors: [{msg: 'Server error'}]})
        }
    }
});

// uploads pdfs, and saves 
const upload = async (req) => {
    try {
        const {tags} = req.body
        if(!req.files) {
            throw new CustomException('No file uploaded', 400)
        }
        const file = req.files.file

        if(file.mimetype != 'application/pdf') {
            throw new CustomException('Please upload a pdf only', 400)
        }

        // Place the file in directory with a random name.
        fileName = helpers.randomValueHex(16)
        file.mv(`${process.env.PWD}/PDFs/${fileName}`)
        return fileName
    } catch (err) {
        throw err
    }
}
  
module.exports = router