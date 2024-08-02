let zoom = 2.5
class Boundary {
    static height = 32 * zoom
    static width = 32 * zoom
    constructor({position, zoom, color}) {
        this.position = position
        this.width = zoom * 32
        this.height = zoom * 32
        this.color = color
    }
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
class Interactable extends Boundary {
    constructor({position, zoom, color}) {
        super({position: position, zoom: zoom, color: color});
    }
}

class Sprite {
    constructor({position, velocity, image, frames = {max: 1}, sprites, active = true}) {
        this.position = position
        this.velocity = velocity
        this.active = active
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 
        }
        this.moving = false
        this.sprites = sprites
    }

    draw() {
        // c.fillStyle = 'red';
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);
        if (!this.active) return
        c.drawImage(
            this.image, 
            this.frames.val * this.width, 
            0, 
            this.image.width / this.frames.max, 
            this.image.height, 
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max, 
            this.image.height      
        )
        if (!this.moving) return
        if (this.frames.max > 1) {
            this.frames.elapsed++
        }
        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }
}

