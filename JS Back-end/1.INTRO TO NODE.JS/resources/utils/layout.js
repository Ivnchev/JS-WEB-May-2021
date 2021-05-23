const fs = require('fs/promises')

module.exports = layout = (main) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet">
    <link rel="stylesheet" href="/static/styles/site.css">
    <link rel="shortcut icon" type="image/png" href="/static/images/pawprint.ico"/>
    <title>Cat Shelter</title>
</head>
<body>
    <header>
        <nav>
            <ul class="navigation">
                <li><a href="/">Home Page</a></li>
                <li><a href="/add-breed">Add Breed</a></li>
                <li><a href="/add-cat">Add Cat</a></li>
            </ul>
        </nav>
        <h1>Cat Shelter</h1>
        <form action="/" method="GET">
            <input type="text" name="search">
            <button type="submit">Search</button>
        </form>
    </header>
    ${main}
</body>
</html>`

function renderCat(cats) {
    return cats.map(x => {
        return `<li>
                <img src="/static/images/${x.image}" alt="Black Cat">
                    <h3>${x.name}</h3>
                    <p><span>Breed: </span>${x.breed}</p>
                    <p><span>Description: </span>${x.description}</p>
                    <ul class="buttons">
                        <li class="btn edit"><a href="/cats/${x._id}/edit">Change Info</a></li>
                        <li class="btn delete"><a href="/cats/${x._id}/new-home">New Home</a></li>
                    </ul>
            </li>`
    }).join('')

}


module.exports = async function loadTemplate(path, resource) {
    if(path === undefined){
        return layout(resource)
    }
    try {
        const rowTemplate = await fs.readFile(path)
        let template = rowTemplate.toString()
        if (template.includes('{{BREEDS}}')) {
            template = template.replace('{{BREEDS}}', resource.map(x => `<option value="${x}">${x}</option>`).join(''))
        }
        if (template.includes('{{CATS}}')) {
            template = template.replace('{{CATS}}', renderCat(resource))
        }

        return layout(template)
    } catch (err) {
        return ''
    }
}


