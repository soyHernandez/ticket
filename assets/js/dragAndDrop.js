
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    function highlight() {
        dropArea.classList.add('highlight');
    }
    
    function unhighlight() {
        dropArea.classList.remove('highlight');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    function handleEmements(infoText,browseBtn,containerBtn){
        infoText.style.display = "none"
        browseBtn.style.display = "none"
        containerBtn.style.display = "block";
    }


    function reset(prevImg,fileElements,infoText,browseBtn,containerBtn) {
        prevImg.src = '';
        prevImg.style.display = 'none';
        fileElements.value = ''; // Limpia el input file
        infoText.style.display = "block"
        browseBtn.style.display = "block"
        containerBtn.style.display = "none";
    }
    
    function error(msg) {
        msg.children[1].style.color="red"
        msg.children[1].style.fontWeight ="300";
        msg.children[1].textContent = "File too lager, please upload a photo under 500KB"
        msg.children[0].style.filter = 'sepia(1) hue-rotate(302deg) saturate(50)';
    }

    function handleFiles(files, prev,infoText,browseBtn,secondBtn,fileElements, containerBtn) {
        if (files.length) {
            const file = files[0];
            const maxSize = 500;
            const maxSizeByte = maxSize * 1024;
            const allowedTypes = ['image/jpeg', 'image/png'];
            let imgprev= prev

            if (!allowedTypes.includes(file.type)) {
                alert("formato no permitido");
                return;
            }
            if(file.size > maxSizeByte){
                let infoMsg = document.getElementById('infoImg')
                error(infoMsg)
                reset(prev,fileElements,infoText,browseBtn,containerBtn)
                return;
            }
                const reader = new FileReader();
                reader.onload = function(e) {
                    imgprev.src = e.target.result;
                    imgprev.style.display = 'block';
                    handleEmements(infoText,browseBtn,containerBtn)
                };
                    reader.readAsDataURL(file);         
        }
    }

document.addEventListener('DOMContentLoaded', function(){
    const dropArea = document.getElementById('drop-area');
    const fileElements = document.getElementById('fileElement');
    const browseBtn = document.getElementById('btnBrowse');
    const prevImg = document.getElementById('imgPreview');
    const infoText = document.getElementById('infoText');
    const secondBtn = document.getElementById("secondBtn");
    const removeBtn = document.getElementById("removeBtn");
    const btnContainer = document.getElementById('btnContainer')
    const sendInfo = document.getElementById("btnSendInfo");

    btnContainer.style.display = "none";
    prevImg.style.display = "none";

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });


    // Manejar el evento de soltar archivos
    dropArea.addEventListener('drop', handleDrop, false);

    sendInfo.addEventListener('click', preventDefaults)

    removeBtn.addEventListener('click', function() {
        preventDefaults
        reset(prevImg,fileElements,infoText,browseBtn,btnContainer)
    })

    // Manejar la selección de archivos mediante el botón
    browseBtn.addEventListener('click', function() {
        fileElements.click();
    });

    fileElements.addEventListener('change', function() {
        handleFiles(this.files, prevImg,infoText,browseBtn,secondBtn,fileElements,btnContainer);
    });

    secondBtn.addEventListener('click', function() {
        reset(prevImg,fileElements,infoText,browseBtn,btnContainer)
        fileElements.click();
        
    });

});
