

module.exports = newHome = (cat) => `
<form action="/cats/${cat._id}/new-home" method="POST" class="cat-form">
<h2>Shelter the cat</h2>
<img src="/static/images/${cat.image}" alt="">
<label for="name">Name</label>
<input type="text" id="name" value="${cat.name}" disabled>
<label for="description">Description</label>
<textarea id="description" disabled>${cat.description}</textarea>
<label for="group">Breed</label>
<select id="group" disabled>
    <option value="${cat.breed}" >${cat.breed}</option>
</select>
<button>SHELTER THE CAT</button>
</form>`