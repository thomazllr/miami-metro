
document.addEventListener('DOMContentLoaded', function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
});

// Função chamada pelo botão de delete
function confirmDelete(buttonElement) {
    const deleteUrl = buttonElement.getAttribute('data-url');
    const officerName = buttonElement.getAttribute('data-name');
    
    document.getElementById('officerName').innerText = officerName;
    document.getElementById('deleteForm').action = deleteUrl;
    
    const myModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    myModal.show();
}