const { quranCreate } = require('../controllers/generatorControllers')


const router = require('express').Router()

router.get('/quran',quranCreate)


module.exports = router