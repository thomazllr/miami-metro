
document.addEventListener('DOMContentLoaded', function () {
    
    const photoInput = document.getElementById('id_photo'); // ID padrão do Django
    const previewImage = document.getElementById('previewImage');
    const uploadBtn = document.getElementById('uploadBtn');

    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            photoInput.click();
        });
    }

    if (photoInput) {
        photoInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                }
                
                reader.readAsDataURL(file);
            }
        });
    }
});