document.addEventListener("DOMContentLoaded", () => {

    // === Aplicar .form-control automaticamente ===
    document.querySelectorAll('input[type="text"], textarea').forEach(input => {
        input.classList.add('form-control');
    });

    // === Status Select Styling ===
    const statusSelect = document.querySelector('select[name="status"]');
    if (statusSelect) {
        statusSelect.classList.add('form-select');
        
        const updateStatusVisual = () => {
            const selectedValue = statusSelect.value;
            const selectedOption = statusSelect.options[statusSelect.selectedIndex];
            const text = selectedOption.text.toLowerCase();
            
            // Remove todas as classes de status anteriores
            statusSelect.classList.remove('status-active', 'status-missing', 'status-captured', 'status-dead');
            
            // Aplica a classe baseada no status selecionado
            if (selectedValue === '4' || text.includes('active')) {
                statusSelect.classList.add('status-active');
            } else if (selectedValue === '3' || text.includes('missing')) {
                statusSelect.classList.add('status-missing');
            } else if (selectedValue === '2' || text.includes('captured')) {
                statusSelect.classList.add('status-captured');
            } else if (selectedValue === '1' || text.includes('dead')) {
                statusSelect.classList.add('status-dead');
            }
        };
        
        updateStatusVisual();
        statusSelect.addEventListener('change', updateStatusVisual);
    }

    // === Danger Level Slider ===
    const dangerInput = document.querySelector('input[name="danger_level"]');
    const dangerBadge = document.getElementById('dangerValue');

    if (dangerInput) {
        dangerInput.type = "range";
        dangerInput.min = 1;
        dangerInput.max = 5;

        const updateBadge = (val) => {
            dangerBadge.innerText = "Level " + val;

            if (val <= 2) dangerBadge.className = "badge bg-info";
            else if (val <= 3) dangerBadge.className = "badge bg-warning text-dark";
            else dangerBadge.className = "badge bg-danger";
        };

        updateBadge(dangerInput.value || 1);
        dangerInput.addEventListener("input", () => updateBadge(dangerInput.value));
    }

    // === Preview das fotos ===
    document.querySelectorAll('.upload-box input[type="file"]').forEach(input => {
        input.addEventListener("change", e => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            const box = e.target.closest(".upload-box");

            reader.onload = (ev) => {
                let oldPreview = box.querySelector(".preview-image");
                if (oldPreview) oldPreview.remove();

                const img = document.createElement("img");
                img.src = ev.target.result;
                img.className = "preview-image";

                box.appendChild(img);
            };

            reader.readAsDataURL(file);
        });
    });

    // === Delete Photo Functionality ===
    const deleteToastEl = document.getElementById('deleteToast');
    const deleteToast = deleteToastEl ? new bootstrap.Toast(deleteToastEl) : null;

    document.querySelectorAll('.btn-delete-photo').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.photo-card');
            const wrapper = this.closest('.photo-item'); // Coluna pai
            const checkbox = card.querySelector('input[type="checkbox"]');
            
            if (checkbox) {
                // Marca o checkbox oculto
                checkbox.checked = true;
                
                // Esconde visualmente a foto (mas mantém no DOM para o form ser enviado)
                wrapper.style.display = 'none';
                
                // Mostra o Toast
                if (deleteToast) {
                    deleteToast.show();
                }
            }
        });
    });

// === Modal de Confirmação ===
    const form = document.querySelector('form');
    const modalElement = document.getElementById('confirmModal');
    const modal = new bootstrap.Modal(modalElement);
    const confirmBtn = document.getElementById('confirmSubmit');
    
    let formSubmitting = false; // Flag para evitar loop

    if (form) {
        form.addEventListener('submit', (e) => {
            if (formSubmitting) {
                return true;
            }
            
            e.preventDefault();
            
            // Pega os dados do formulário
            const suspectName = document.querySelector('input[name="name"]').value || 'Não informado';
            
            // Status Info
            const statusSelect = document.querySelector('select[name="status"]');
            const statusText = statusSelect.options[statusSelect.selectedIndex].text;
            const statusValue = statusSelect.value;
            
            // Danger Level Info
            const dangerInput = document.querySelector('input[name="danger_level"]');
            const dangerLevel = dangerInput ? dangerInput.value : '1';

            // Photo Info
            const hasNewPhotos = Array.from(document.querySelectorAll('.upload-box input[type="file"]'))
                .some(input => input.files.length > 0);
            const existingPhotosCount = document.querySelectorAll('.photo-card:not([style*="display: none"])').length; // Conta apenas visíveis
            
            const newPhotosCount = Array.from(document.querySelectorAll('.upload-box input[type="file"]'))
                .filter(input => input.files.length > 0).length;
            
            // Preenche o modal
            document.getElementById('modalSuspectName').textContent = suspectName;
            
            // Preenche Status no Modal
            const modalStatusBadge = document.getElementById('modalStatusBadge');
            modalStatusBadge.textContent = statusText;
            modalStatusBadge.className = 'badge rounded-pill px-3 py-2'; // Reset classes
            
            if (statusValue === '4') modalStatusBadge.classList.add('bg-danger'); // Active
            else if (statusValue === '3') modalStatusBadge.classList.add('bg-warning', 'text-dark'); // Missing
            else if (statusValue === '2') modalStatusBadge.classList.add('bg-success'); // Captured
            else if (statusValue === '1') modalStatusBadge.classList.add('bg-secondary'); // Dead
            else modalStatusBadge.classList.add('bg-light', 'text-dark');

            // Preenche Danger Level no Modal
            document.getElementById('modalDangerLevel').textContent = 'Level ' + dangerLevel;
            const dangerBar = document.getElementById('modalDangerBar');
            dangerBar.style.width = (dangerLevel * 20) + '%';
            
            // Cores da barra de perigo
            dangerBar.className = 'progress-bar';
            if (dangerLevel <= 2) dangerBar.classList.add('bg-info');
            else if (dangerLevel <= 3) dangerBar.classList.add('bg-warning');
            else dangerBar.classList.add('bg-danger');

            
            const photoInfo = document.getElementById('photoInfo');
            const photoCount = document.getElementById('modalPhotoCount');
            const noPhotoWarning = document.getElementById('noPhotoWarning');
            
            if (hasNewPhotos || existingPhotosCount > 0) {
                photoInfo.classList.remove('d-none');
                noPhotoWarning.classList.add('d-none');
                
                let photoText = '';
                if (existingPhotosCount > 0) {
                    photoText += `${existingPhotosCount} foto(s) já anexada(s)`;
                }
                if (newPhotosCount > 0) {
                    if (photoText) photoText += ' + ';
                    photoText += `${newPhotosCount} nova(s) foto(s)`;
                }
                
                photoCount.textContent = photoText;
            } else {
                photoInfo.classList.add('d-none');
                noPhotoWarning.classList.remove('d-none');
            }
            
            // Mostra o modal
            modal.show();
        });
        
        confirmBtn.addEventListener('click', () => {
            formSubmitting = true;
            modal.hide();
            
            modalElement.addEventListener('hidden.bs.modal', () => {
                form.submit();
            }, { once: true });
        });
    }

});