const computerImage = new Image()
computerImage.src = './assets/img/misc/COMPUTERscreenwhitebag.png'
const computerScene = new Scene(computerImage)

function animateInteractableScene(scene) {
    socials.style.display = 'flex'
    var left = getWidth()/2 -  socials.offsetWidth / 2 - 20
    var topOffset = getHeight()/2 -  socials.offsetHeight/2 - 30
    socials.style.top = topOffset
    socials.style.left = left
    scene.animationId = window.requestAnimationFrame(() => animateInteractableScene(scene));

    if (!scene.active) {
        document.getElementById('linkedin').focus();
        scene.active = true; // Set the flag to true after the first render
    }

    scene.active = true
    scene.draw()
}