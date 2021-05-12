function swapItems(index1, index2) {
    const ElementOne = document.querySelector("[data-index='" + index1 + "']");
    const ElementTwo = document.querySelector("[data-index='" + index2 + "']");
    let SiblingOne = ElementOne.previousElementSibling;
    let SiblingTwo = ElementTwo.previousElementSibling;
 
    if (!SiblingOne) {
        const parent = ElementOne.parentElement;
        ElementTwo.insertAdjacentElement('afterend', ElementOne); //After the element, so after the targetElement itself
        parent.insertAdjacentElement('afterbegin', ElementTwo); //After the begin of the element (as first child)
                                                                //so just inside the targetElement and before its first child
    } 

    else if (!SiblingTwo) {
        const parent = ElementTwo.parentElement;
        ElementOne.insertAdjacentElement('afterend', ElementTwo);
        parent.insertAdjacentElement('afterbegin', ElementOne);
    } 

    else { 
        if (SiblingOne === ElementTwo) {
            ElementOne.insertAdjacentElement('afterend', ElementTwo);
        } else if (SiblingTwo === ElementOne) {
            ElementOne.insertAdjacentElement('beforebegin', ElementTwo); //Before the element, so before the targetElement itself
        } else {
            ElementOne.insertAdjacentElement('afterend', ElementTwo);
            SiblingTwo.insertAdjacentElement('afterend', ElementOne);
        }
    }
}

function initDragAndDrop() {
    const draggableItemsContainer = document.querySelector('ul');

    draggableItemsContainer.addEventListener('dragstart', (e) => {
        e.target.classList.add('dragged');
    });

    draggableItemsContainer.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragged');
    });

    draggableItemsContainer.addEventListener('dragenter', (e) => {
        const ItemOnTheMove = document.querySelector('.dragged');
        if (e.target.dataset.index && e.target.dataset.index !== ItemOnTheMove.dataset.index) {
            e.target.classList.add('dragover');
        }
    });

    draggableItemsContainer.addEventListener('dragleave', (e) => {
        if (e.target.dataset.index) {
            e.target.classList.remove('dragover');
        }
    });

    draggableItemsContainer.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.dataset.index);
        e.target.classList.add('dragged');
    });

    draggableItemsContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    draggableItemsContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        e.target.classList.remove('dragover');
        const index1 = e.dataTransfer.getData('text/plain');
        const index2 = e.target.dataset.index;
        
        if (index1 && index2) {
            swapItems(index1, index2);
        }
    });
}

function initTouch() {
    const draggableItemsContainer = document.querySelector('ul');
    let initialX = 0;
    let initialY = 0;
    let lastX = 0;
    let lastY = 0;

    draggableItemsContainer.addEventListener('touchstart', (e) => {
        if(e.target.tagName == 'li'){
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
            e.target.classList.add('dragged');
        }
    });

    draggableItemsContainer.addEventListener('touchmove', (e) => {
        if(e.target.tagName == 'li'){
            const x = e.touches[0].clientX - initialX;
            const y = e.touches[0].clientY - initialY;
            lastX = e.touches[0].clientX;
            lastY = e.touches[0].clientY;
            e.target.style.transform = "translate(" + x + "px, " + y + "px)";

            const touchmoveEvent = document.elementsFromPoint(lastX, lastY);
        
            if(touchmoveEvent.length > 4){
                if(!touchmoveEvent[1].classList.contains('dragover')){
                    touchmoveEvent[1].classList.add('dragover');
                }
            } 

            else {
                let list = document.getElementsByClassName('dragover');
                if(list.length > 0){
                    list[0].classList.remove('dragover');
                }
            }
        }
    });
        
    draggableItemsContainer.addEventListener('touchend', (e) => {
        if(e.target.tagName == 'li'){
            const touchmoveEvent = document.elementsFromPoint(lastX, lastY);
            if (touchmoveEvent.length > 1 && touchmoveEvent[1].hasAttribute('draggable')) {
                swapItems(e.target.dataset.index, touchmoveEvent[1].dataset.index);
            }

            e.target.style.transform = "";
            e.target.classList.remove('dragged');
            touchmoveEvent[1].classList.remove('dragover');
        }
    });
}
