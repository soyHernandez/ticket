document.addEventListener('DOMContentLoaded', function(){
    const dropArea = document.getElementById('drop-area');
    const fileElements = document.getElementById('fileElement');
    const browseBtn = document.getElementById('btnBrowse');
    const prevImg = document.getElementById('imgPreview');
    const infoText = document.getElementById('infoText');
    const secondBtn = document.getElementById("secondBtn")
    var img;
    secondBtn.style.display = "none";
    prevImg.style.display = "none";
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    function reset() {
        prevImg.src = '';
        prevImg.style.display = 'none';
        fileElements.value = ''; // Limpia el input file
    }
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        dropArea.classList.add('highlight');
    }

    function unhighlight() {
        dropArea.classList.remove('highlight');
    }

    // Manejar el evento de soltar archivos
    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    // Manejar la selección de archivos mediante el botón
    browseBtn.addEventListener('click', function() {
        fileElements.click();
    });

    fileElements.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleEmements(){
        infoText.style.display = "none"
        browseBtn.style.display = "none"
        secondBtn.style.display = "block";
    }

    function resetElements(params) {
        infoText.style.display = "block"
        browseBtn.style.display = "block"
        secondBtn.style.display = "none";
    }
    secondBtn.addEventListener('click', function() {
        reset()
        fileElements.click();
    });
    // Procesar los archivos y mostrar la vista previa
    function handleFiles(files) {
        if (files.length) {
            const file = files[0];
            const maxSize = 500;
            const maxSizeByte = maxSize * 1024;
            const allowedTypes = ['image/jpeg', 'image/png'];

            if (!allowedTypes.includes(file.type)) {
                alert("formato no permitido");
                return;
            }
            if(file.size > maxSizeByte){
                let imgSize = (file.size/1024).toFixed(2);
                alert(`La imagen es demasiado grande (${imgSize}KB). El tamaño máximo permitido es ${maxSize}KB.`);
                reset()
                resetElements()
                return;
            }
                const reader = new FileReader();
                reader.onload = function(e) {
                    prevImg.src = e.target.result;
                    img=e.target.result;
                    prevImg.style.display = 'block';
                    handleEmements()
                };
                    reader.readAsDataURL(file);         
        }
    }
});