function Gallery(gallery) {
    if(!gallery){
        throw new Error('No Gallery Found!');
    }
    
    // select the elements we need
    const images = Array.from(gallery.querySelectorAll('img'));
    
    const modal = document.querySelector('.modal');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentImage;

    function openModal() {
        // First check if the modal is already open
        if(modal.matches('.open')){
            console.info('Modal already open');
            return;
        }
        modal.classList.add('open');

        prevButton.addEventListener('click', showPrevImage);
        nextButton.addEventListener('click', showNextImage);
        window.addEventListener('keyup', handleKeyUp);
    }

    function closeModal() {
        modal.classList.remove('open');

        modal.addEventListener('click', handleClickOutside);
        window.addEventListener('keyup', handleKeyUp);
    }

    function handleClickOutside(e) {
        if (e.target === e.currentTarget) closeModal();
    }

    function handleKeyUp(e) {
        if (e.key === 'Escape') closeModal();

        if (e.key === 'ArrowRight') showNextImage();

        if(e.key === 'ArrowLeft') showPrevImage();
    }

    function showNextImage(){
        showImage(currentImage.nextElementSibling || gallery.firstElementChild);
    }

    function showPrevImage() {
        showImage(currentImage.previousElementSibling || gallery.lastElementChild);
    }
    
    function showImage(el) {
        if(!el){
            console.info('No image to show');
            return;
        }

        modal.querySelector('img').src = el.src;
        modal.querySelector('h2').textContent = el.title;
        modal.querySelector('p').textContent = el.dataset.description;
        currentImage = el;
        openModal();
    }

    // Event listeners
    images.forEach(image => image.addEventListener('click', e => showImage(e.currentTarget)));
    images.forEach(image => 
        image.addEventListener('keyup', e => {
            if(e.key === 'Enter'){
                showImage(e.currentTarget);
            }
        })
    );
    modal.addEventListener('click', handleClickOutside);
}

Gallery(document.querySelector('.gallery1'));
Gallery(document.querySelector('.gallery2'));

