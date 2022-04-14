const infoBtn = document.querySelector('.info-btn');
const authorInfo = document.querySelector('.author-info');
const xMark = document.querySelector('.fa-xmark');
const faInfo = document.querySelector('.fa-info');

const showAuthorInfo = () => {
    authorInfo.classList.toggle('show');
    toggleDisplayBtns();
}

const toggleDisplayBtns = () => {
    xMark.classList.toggle('hide');
    faInfo.classList.toggle('hide');
}

infoBtn.addEventListener('click', showAuthorInfo);