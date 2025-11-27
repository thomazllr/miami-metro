
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

// Função chamada pelo botão de detalhes
function showDetail(buttonElement, event) {
    // Previne o comportamento padrão do link
    if (event) event.preventDefault();

    const name = buttonElement.getAttribute('data-name');
    const rank = buttonElement.getAttribute('data-rank');
    const department = buttonElement.getAttribute('data-department');
    const status = buttonElement.getAttribute('data-status');
    const badge = buttonElement.getAttribute('data-badge');
    const photo = buttonElement.getAttribute('data-photo');
    const casesId = buttonElement.getAttribute('data-cases-id');

    document.getElementById('detailName').innerText = name;
    document.getElementById('detailRank').innerText = rank;
    document.getElementById('detailDepartment').innerText = department;
    document.getElementById('detailStatus').innerText = status;
    document.getElementById('detailBadge').innerText = '#' + badge;
    document.getElementById('detailPhoto').src = photo;

    // Copia o conteúdo da lista de casos oculta para o modal
    const casesContent = document.getElementById(casesId).innerHTML;
    document.getElementById('detailCases').innerHTML = casesContent;

    const myModal = new bootstrap.Modal(document.getElementById('detailModal'));
    myModal.show();
}