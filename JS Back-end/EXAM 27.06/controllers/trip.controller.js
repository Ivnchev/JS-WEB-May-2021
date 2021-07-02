const router = require('express').Router()

const guards = require('../middlewares/guards')

router.get('/create', guards.isLogged, function (req, res, next) {
    res.render('trip/create', {title: 'Create Page'})
})

router.post('/create', guards.isLogged, function (req, res, next) {
    const data = { ...req.body, creator: req.user._id }
    req.services.storage.create(data, req.user._id)
        .then(() => {
            res.redirect('/trip/shared')
        }).catch(err => {
            err.data = req.body
            err.view = 'trip/create'
            next(err)
        })
})

router.get('/shared', function (req, res, next) {
    req.services.storage.getAll()
        .then(trips => {
            res.render('trip/shared-trips', { trips, title: 'Shared trips' })
        })
        .catch(err => {
            err.view = 'trip/shared-trips'
            next(err)
        })

})


router.get('/:id/join', guards.isLogged, guards.isNotOwner, guards.isJoined, function (req, res, next) {
    req.services.storage.updateJoined(req.params.id, req.user._id)
        .then(() => res.redirect(`/trip/${req.params.id}/details`))
        .catch(err => {
            err.view = 'trip/details'
            next(err)
        })
})

router.get('/:id/details', function (req, res, next) {
    req.services.storage.getOne(req.params.id)
        .then(data => {
            if (req.user) {
                data.isCreator = data.creator._id.toString() == req.user._id.toString()
                data.isJoined = data.buddies.find(x => x._id.toString() === req.user._id.toString())
                data.isFreeSeats = data.seats > 0
            }
            console.log(data);
            res.render('trip/details', { data, driver: data.creator.email, title: 'Details Page' })
        }).catch(err => {
            err.view = 'trip/details'
            next(err)
        })
})

router.get('/:id/delete', guards.isLogged, guards.isOwner, function (req, res, next) {
    req.services.storage.delete(req.params.id)
        .then(() => res.redirect('/trip/shared'))
        .catch(err => {
            err.view = 'trip/details'
            next(err)
        })
})

router.get('/:id/edit', guards.isLogged, guards.isOwner, function (req, res, next) {
    req.services.storage.getOne(req.params.id)
        .then(data => res.render('trip/edit', { data, title: 'Edit Page' }))
        .catch(err => {
            err.data = { ...req.body, _id: req.params.id }
            err.view = 'trip/edit'
            next(err)
        })

})

router.post('/:id/edit', guards.isLogged, guards.isOwner, function (req, res, next) {
    req.services.storage.update(req.params.id, req.body)
        .then(() => res.redirect(`/trip/${req.params.id}/details`))
        .catch(err => {
            err.data = { ...req.body, _id: req.params.id }
            err.view = 'trip/edit'
            next(err)
        })

})





module.exports = router