const router = require('express').Router()
const accessoryService = require('../services/accessoryService')


router.get('/create', accessoryService.getCeateAccessory)
router.post('/create', accessoryService.postCreateAccessory)

router.get('/:id/attach', accessoryService.getAttachAccessory)
router.post('/:id/attach', accessoryService.postAttachAccessory)


module.exports = router