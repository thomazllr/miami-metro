function confirmDelete(id, name) {
    document.getElementById('killerName').innerText = name;

    let url = deleteUrlTemplate.replace('0', id);
    document.getElementById('deleteForm').action = url;

    var myModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    myModal.show();
}
