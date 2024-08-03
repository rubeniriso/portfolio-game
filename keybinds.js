
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    shift: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

window.addEventListener('keydown', (e) => {
    console.log(e.key);
    switch (e.key) {
        case 'w':
            lastKey = 'w'
            keys.w.pressed = true
            break
        case 'a':
            lastKey = 'a'
            keys.a.pressed = true
            break
        case 's':
            lastKey = 's'
            keys.s.pressed = true
            break
        case 'd':
            lastKey = 'd'
            keys.d.pressed = true
            break
        case ' ':
            e.preventDefault()
            if (interactButton.active) {
                if (isDialogActive) {
                    dialogModal.active = !dialogModal.active
                }
                if (isInDesk && !isInteractableSceneActive) {
                    isInteractableSceneActive = true
                    window.cancelAnimationFrame(scene.animationId)
                    animateInteractableScene(computerScene)  
                } else if (isInDesk && isInteractableSceneActive){
                    window.cancelAnimationFrame(scene.animationId)
                    isInteractableSceneActive = false
                    scene.animationId = animate()
                }
            } 
            break
        case 'Escape':
            e.preventDefault()
            if (interactButton.active) {
                if (isInDesk && isInteractableSceneActive){
                    window.cancelAnimationFrame(scene.animationId)
                    isInteractableSceneActive = false
                    scene.animationId = animate()
                }
            } 
            break
    }
})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})

