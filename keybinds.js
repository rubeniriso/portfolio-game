
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
        case 'space':
            e.preventDefault()
            keys.space.pressed = true
            break
    }
})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'Shift':
            keys.shift.pressed = false
            break
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
        case 'space':
            keys.space.pressed = false
            break
    }
})

