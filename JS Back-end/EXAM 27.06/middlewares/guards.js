
const isLogged = function (req, res, next) {
    if (req.user === undefined) {
        return res.redirect('/auth/login')
    }
    next()
}

const isNotLogged = function (req, res, next) {
    if (req.user !== undefined) {
        return res.redirect('/')
    }
    next()
}

const isJoined = function (req, res, next) {
    req.services.storage.isJoined(req.params.id, req.user._id)
        .then(data => {
            if (data.buddies.length > 0 || data.seats === 0) {
                return res.redirect(`/trip/${req.params.id}/details`)
            }
            next()
        }).catch(next)
}

const isOwner = function (req, res, next) {
    req.services.storage.getOne(req.params.id)
        .then(data => {
            if (data.creator._id.toString() !== req.user._id.toString()) {
               return res.redirect(`/trip/${req.params.id}/details`)
            }
            next()
        }).catch(next)
}

const isNotOwner = function (req, res, next) {
    req.services.storage.getOne(req.params.id)
        .then(data => {
            if (data.creator._id.toString() === req.user._id.toString()) {
               return res.redirect(`/trip/${req.params.id}/details`)
            }
            next()
        }).catch(next)
}




module.exports = {
    isLogged,
    isNotLogged,
    isJoined,
    isOwner,
    isNotOwner
}