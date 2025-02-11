const { quranCreate, getQuran, duaCreate,salaturTopics,salaturSingleTopics,salaturTopicsUpdate,salahTopicsUpdate ,salahTopics,salahSingleTopics, dbTest} = require('../controllers/generatorControllers')


const router = require('express').Router()

router.get('/salatur/topics',salaturTopics)
router.get('/salatur/topics/:cat_id/:id',salaturSingleTopics)
router.put('/salatur/topics/:cat_id/:id',salaturTopicsUpdate)
router.get('/salah/topics',salahTopics)
router.get('/salah/topics/:cat_id/:id',salahSingleTopics)
router.put('/salah/topics/:cat_id/:id',salahTopicsUpdate)
router.get('/db',dbTest)


module.exports = router