

module.exports = function (err, req, res, next) {
    console.log(err);
    if (err.message && err.message.includes('duplicate')) {
        const error = err.message.match(/([\w\.\s]+: "[\w\d\s\.]+")/gi)[0]
        const duplicateError = { message: `This ${error} already exist. Choose another!`, data: err.data }
        return res.render(err.view, { errors: [duplicateError] })
    }
    if (err.view) {
        return res.render(err.view, { errors: err.errors, data: err.data })
    }

    return res.render('home/home', {errors: [{ message: "Server error: " + err.status || 500}]})
}