const staticFiles = require('../app/static')

const handlers = {}

function matchRequests(method, url) {
    if(method === 'GET' && url.startsWith('/static/')){
        return staticFiles
    }
    if(method === "GET" && url.startsWith('/?search')){
        const searchMethods = handlers['/search']
        const searchHandler = searchMethods[method] ? searchMethods[method] : notFound
        return searchHandler
    }
    if(/^\/cats\/[0-9]\/edit$/g.test(url)){
        const editMethods = handlers['/cats/:id/edit']
        const editHandler = editMethods[method] ? editMethods[method] : notFound
        return editHandler
    }
    if(/^\/cats\/[0-9]\/new-home$/g.test(url)){
        const newHomeMethods = handlers['/cats/:id/new-home']
        const newHomeHandler = newHomeMethods[method] ? newHomeMethods[method] : notFound
        return newHomeHandler
    }

    const methods = handlers[url] ? handlers[url] : {}
    const handler = methods[method] ? methods[method] : notFound

    return handler
}


function registerHandler(method, url, handler) {
    const methods = handlers[url] ? handlers[url] : {}
    handlers[url] = methods
    handlers[url][method] = handler
}

function notFound(req, res) {
    res.statusCode = 404
    res.end('NOT FOUND!')
}

module.exports = {
    registerHandler,
    matchRequests,
    get: (...params) => registerHandler('GET', ...params),
    post: (...params) => registerHandler('POST', ...params),
    delete: (...params) => registerHandler('DELETE', ...params),
}