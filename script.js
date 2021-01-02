import gallery from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const largeImageRef = document.querySelector('.lightbox__image');
const modalContainerRef = document.querySelector('.js-lightbox');
const closeButtonRef = document.querySelector('button[data-action="close-lightbox"]');
const overlayRef = document.querySelector('.lightbox__overlay');


const imagesList = gallery.map((image, index) => {
  const list = document.createElement('li');
  const link = document.createElement('a');
  const photo = document.createElement('img');
  link.appendChild(photo);
  list.appendChild(link);
  link.href = image.original;
  photo.src = image.preview;
  photo.alt = image.description;
  photo.dataset.source = image.original;
  photo.dataset.index = index;
  photo.classList.add('gallery__image');
  link.classList.add('gallery__link');
  list.classList.add('gallery__item');
  return list;
});

galleryRef.append(...imagesList);

galleryRef.addEventListener('click', galleryClick);

function galleryClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }

    largeImageRef.src = event.target.dataset.source;
    largeImageRef.alt = event.target.alt;
    largeImageRef.dataset.index = event.target.dataset.index;

    window.addEventListener('keyup', modalWithBtn);
    closeButtonRef.addEventListener('click', closeModal);
    overlayRef.addEventListener('click', closeModal);
    modalContainerRef.classList.add('is-open');
}

function closeModal() {
        largeImageRef.src = '';
        modalContainerRef.classList.remove('is-open');
        window.removeEventListener('keyup', modalWithBtn);
        closeButtonRef.removeEventListener('click', closeModal);
        overlayRef.removeEventListener('click', closeModal);
}

function nextImage() {
    let index = '';

    if (largeImageRef.dataset.index < imagesList.length - 1) {
        index = largeImageRef.dataset.index++;
        index++;
    }
    setNewSrc(index);
    console.log(index, largeImageRef);
}

function backImage() {
    let index = '';

    if (largeImageRef.dataset.index > 0) {
        index = largeImageRef.dataset.index--;
        index--;
    }
    setNewSrc(index);
    console.log(index, largeImageRef);
}

function setNewSrc(index) {
    imagesList.forEach(image => {
        if (
            image.lastElementChild.lastElementChild.dataset.index ===
            index.toString()
        ) {
            largeImageRef.src =
                image.lastElementChild.lastElementChild.dataset.source;
            largeImageRef.alt = image.lastElementChild.lastElementChild.alt;
        }
    });
}

function modalWithBtn({ code }) {
    if (code === 'Escape') {       
        closeModal();        
    } else if (code === 'ArrowRight') {
        nextImage();
    } else if (code === 'ArrowLeft') {
        backImage();
    }
}