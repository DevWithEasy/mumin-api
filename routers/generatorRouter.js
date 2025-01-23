const { quranCreate, getQuran } = require('../controllers/generatorControllers')


const router = require('express').Router()

router.get('/quran',quranCreate)
router.get('/quran/ar',getQuran)


module.exports = router