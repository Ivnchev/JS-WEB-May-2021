const router = require('express').Router()


router.get('/profile', function (req, res, next) {
    req.services.user.getOne(req.user._id)
        .then(userData => {
            console.log(userData);
            const user = { email: userData.email, trips: userData.trips, tripsCount: userData.trips.length, gender: userData.gender }
            res.render('user/profile',  user )
        }).catch(next)
})


module.exports = router