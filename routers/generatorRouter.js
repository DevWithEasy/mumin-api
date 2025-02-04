const { quranCreate, getQuran, duaCreate,salaturTopics,salaturSingleTopics,salaturTopicsUpdate,salahTopicsUpdate ,salahTopics,salahSingleTopics, dbTest} = require('../controllers/generatorControllers')


const router = require('express').Router()

router.get('/salatur/topics',salaturTopics)
router.get('/salatur/topics/:id',salaturSingleTopics)
router.put('/salatur/topics/:id',salaturTopicsUpdate)
router.get('/salah/topics',salahTopics)
router.get('/salah/topics/:id',salahSingleTopics)
router.put('/salah/topics/:id',salahTopicsUpdate)
router.get('/db',dbTest)


module.exports = router