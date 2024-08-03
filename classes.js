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
class DialogModal {
    constructor({text, image}){
        this.text = text
        this.image = image
        this.active = false
    }
    draw(){
        if (this.active) {
            c.fillStyle = 'white';
            c.fillRect(0, window.innerHeight - window.innerHeight / 3, window.innerWidth, window.innerHeight / 2);
            c.fillStyle = "black";
            c.font = "20px 'Press Start 2P'";
            c.textAlign = 'middle';
            c.textBaseline = 'left';
            c.fillText(this.text, 17, window.innerHeight - window.innerHeight / 3 + 30);
        }
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

class Scene {
    constructor(bgImage) {
        this.animationId = 0;
        this.background = new Sprite({
            position: {
                x: 0,
                y: 0,
            },
            image: bgImage
        });
        this.active = false;
    }
    draw() {
        if (!this.active) return;
        c.drawImage(this.background.image, (getWidth() - this.background.image.width)/2, 0);
    }
}