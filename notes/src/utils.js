export function autoGrow(textAreaRef){
    const { current } = textAreaRef
    current.style.height = "auto"
    current.style.height = current.scrollHeight + "px"
}

export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
    const offsetLeft = card.offsetLeft - mouseMoveDir.x
    const offsetTop = card.offsetTop - mouseMoveDir.y

    return {
        x: offsetLeft < 0 ? 0 : offsetLeft,
        y: offsetTop < 0 ? 0 : offsetTop
    }
}

export const setZIndex = (selectedCard) => {
    selectedCard.style.zIndex = 998
    
    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        if (card != selectedCard){
            card.style.zIndex = selectedCard.style.zIndex - 1
        }
    })
}