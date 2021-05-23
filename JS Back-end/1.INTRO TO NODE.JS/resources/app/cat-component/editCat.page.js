
module.exports = (cat, breeds) => `
<form action="/cats/${cat._id}/edit" method="POST" class="cat-form" enctype="multipart/form-data">
<h2>Edit Cat</h2>
<label for="name">Name</label>
<input type="text" id="name" value="${cat.name}" name="name">
<label for="description">Description</label>
<textarea id="description" name="description">${cat.description}</textarea>
<label for="image">Image</label>
<input name="upload" type="file" id="image">
<label for="group">Breed</label>
<select id="group" name="breed">
    ${breeds.map(x => `<option value="${x}" ${cat.breed === x ? 'selected' : ''}>${x}</option>`).join("")}
</select>
<button>Edit Cat</button>
</form>`