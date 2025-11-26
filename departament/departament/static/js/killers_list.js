function confirmDelete(id, name) {
    document.getElementById('killerName').innerText = name;

    const modalElement = document.getElementById('deleteModal');
    const urlTemplate = modalElement.getAttribute('data-delete-url-template');
    let url = urlTemplate.replace('0', id);
    
    document.getElementById('deleteForm').action = url;

    var myModal = new bootstrap.Modal(modalElement);
    myModal.show();
}
