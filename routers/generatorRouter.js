const { quranCreate, getQuran, duaCreate } = require('../controllers/generatorControllers')


const router = require('express').Router()

router.get('/quran',quranCreate)
router.get('/quran/ar',getQuran)
router.get('/dua',duaCreate)


module.exports = router