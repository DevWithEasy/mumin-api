const { docsCreate,docsUpdate,docsDelete,docsGet } = require('../controllers/docsControllers')

const router = require('express').Router()

router.get('/',docsGet)
router.post('/',docsCreate)
router.put('/:id',docsUpdate)
router.delete('/:id',docsDelete)


module.exports = router