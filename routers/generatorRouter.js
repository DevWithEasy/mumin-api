const { quranCreate, getQuran, duaCreate,salaturTopics,salaturSingleTopics,salaturTopicsUpdate,salahTopicsUpdate ,salahTopics,salahSingleTopics, dbTest, jakahTopics, jakahSingleTopics, jakahTopicsUpdate} = require('../controllers/generatorControllers')


const router = require('express').Router()

router.get('/salatur/topics',salaturTopics)
router.get('/salatur/topics/:cat_id/:id',salaturSingleTopics)
router.put('/salatur/topics/:cat_id/:id',salaturTopicsUpdate)
router.get('/salah/topics',salahTopics)
router.get('/salah/topics/:cat_id/:id',salahSingleTopics)
router.put('/salah/topics/:cat_id/:id',salahTopicsUpdate)
router.get('/jakah/topics',jakahTopics)
router.get('/jakah/topics/:cat_id/:id',jakahSingleTopics)
router.put('/jakah/topics/:cat_id/:id',jakahTopicsUpdate)
router.get('/sawm/topics',jakahTopics)
router.get('/sawm/topics/:id',jakahSingleTopics)
router.put('/sawm/topics/:id',jakahTopicsUpdate)
router.get('/db',dbTest)


module.exports = router