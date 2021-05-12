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