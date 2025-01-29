const { quranCreate, getQuran, duaCreate,salahTopics,salahSingleTopics,salahTopicsUpdate } = require('../controllers/generatorControllers')


const router = require('express').Router()

router.get('/quran',quranCreate)
router.get('/quran/ar',getQuran)
router.get('/dua',duaCreate)
router.get('/salah/topics',salahTopics)
router.get('/salah/topics/:id',salahSingleTopics)
router.put('/salah/topics/:id',salahTopicsUpdate)


module.exports = router