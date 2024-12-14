const apiUrl = 'http://localhost:3000/artifacts';

let artifactsData = [];

$('#fetchData').on('click', function () {
    $.get(`${apiUrl}/get`)
        .done(function (response) {
            if (response.artifacts && Array.isArray(response.artifacts)) {
                artifactsData = response.artifacts;
                renderTable(artifactsData);
            } else {
                console.error('Error: artifacts data is invalid.');
            }
        })
        .fail(function (error) {
            console.error('Error fetching data:', error);
        });
});

$('#toggleAddData').on('click', function () {
    const $formContainer = $('#addUserFormContainer');
    $formContainer.toggle();
});

$('#addUserForm').on('submit', function (event) {
    event.preventDefault();

    const id = $('#Id').val();
    const artifactName = $('#artifactName').val();
    const description = $('#Description').val();

    if (id && artifactName && description) {
        $.ajax({
            url: `${apiUrl}/create`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                id: id,
                name: artifactName,
                description: description
            }),
            success: function (response) {
                alert(response.message);
                $('#fetchData').click();
                $('#Id').val('');
                $('#artifactName').val('');
                $('#Description').val('');
                $('#addUserFormContainer').hide();
            },
            error: function (error) {
                console.error('Error adding data:', error);
                alert('Failed to add data.');
            }
        });
    } else {
        alert('Please fill out all fields.');
    }
});

function updateArtifact(id) {
    const artifact = artifactsData.find(artifact => artifact.id === id);
    if (!artifact) return;

    const row = $(`#row-${id}`);
    row.html(`
        <td>${artifact.id}</td>
        <td><input type="text" id="edit-artifactName-${id}" value="${artifact.name}"></td>
        <td><input type="text" id="edit-description-${id}" value="${artifact.description}"></td>
        <td>
            <button class="save-btn" onclick="saveArtifact('${id}')">Save</button>
            <button class="delete-btn" onclick="deleteArtifact('${id}')">Delete</button>
        </td>
    `);
}

function saveArtifact(id) {
    const artifactName = $(`#edit-artifactName-${id}`).val();
    const description = $(`#edit-description-${id}`).val();

    if (artifactName && description) {
        $.ajax({
            url: `${apiUrl}/update`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ id, name: artifactName, description }),
        })
            .done(function (response) {
                alert(response.message);
                $('#fetchData').click();
            })
            .fail(function (error) {
                console.error('Error updating data:', error);
                alert('Failed to update data.');
            });
    } else {
        alert('Please fill out all fields before saving.');
    }
}

function deleteArtifact(id) {
    if (confirm('Are you sure you want to delete this artifact?')) {
        $.ajax({
            url: `${apiUrl}/delete/${id}`,
            method: 'DELETE',
        })
            .done(function (response) {
                alert(response.message);
                $('#fetchData').click();
            })
            .fail(function (error) {
                console.error('Error deleting data:', error);
                alert('Failed to delete data.');
            });
    }
}

function renderTable(data) {
    const tableBody = $('#dataTable tbody');
    tableBody.empty();

    data.forEach(artifact => {
        const row = `
            <tr id="row-${artifact.id}">
                <td>${artifact.id}</td>
                <td>${artifact.name || ''}</td>
                <td>${artifact.description}</td>
                <td>
                    <div class="action-buttons">
                        <button class="update-btn" onclick="updateArtifact('${artifact.id}')">Update</button>
                        <button class="delete-btn" onclick="deleteArtifact('${artifact.id}')">Delete</button>
                    </div>
                </td>
            </tr>
        `;
        tableBody.append(row);
    });
}
