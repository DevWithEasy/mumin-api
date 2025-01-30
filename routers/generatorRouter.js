const { quranCreate, getQuran, duaCreate,salahTopics,salahSingleTopics,salahTopicsUpdate,salahAppTopicsUpdate ,salahAppTopics,salahAppSingleTopics} = require('../controllers/generatorControllers')


const router = require('express').Router()

router.get('/quran',quranCreate)
router.get('/quran/ar',getQuran)
router.get('/dua',duaCreate)
router.get('/salah/topics',salahTopics)
router.get('/salah/topics/:id',salahSingleTopics)
router.put('/salah/topics/:id',salahTopicsUpdate)
router.get('/salah_app/topics',salahAppTopics)
router.get('/salah_app/topics/:id',salahAppSingleTopics)
router.put('/salah_app/topics/:id',salahAppTopicsUpdate)


module.exports = router