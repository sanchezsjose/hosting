window.addEventListener('load', initScene) // Evento para que cuando se cargue se inicie la escena

//Array de meteoritos en diferentes posiciones
const meteors = [
    { x: 0, y: 0, z: -30 },
    { x: 0, y: 0, z: 30 },
    { x: 30, y: 0, z: 0 },
    { x: -30, y: 0, z: 0 },
    { x: 20, y: 0, z: 20 },
    { x: 20, y: 0, z: -20 },
    { x: -20, y: 0, z: -20 },
    { x: -20, y: 0, z: 20 }
]

//Variables para los meteoritos y la puntuación
let meteor, score = 0

//Función para lanzar la escena principal
function initScene() {

    //Definimos una variable orbitas en la que añadimos todas las órbitas
    let orbits = document.querySelectorAll('.orbit')

    //Para cada órbita definiermos los meteoritos
    orbits.forEach(orbit => {

        //Para cada meteorito (en la posición del array superior), declaramos una entidad con cada uno de ellos
        meteors.forEach(pos => {

            meteor = document.createElement('a-entity')
            meteor.setAttribute('geometry', { primitive: 'sphere', radius: Math.random() * 3 + 0.5 })
            meteor.setAttribute('material', { shader: 'flat', src: '#meteor' })
            meteor.setAttribute('class', 'meteor')
            meteor.object3D.position.set(pos.x, pos.y, pos.z) //Se podría usar setAttribute, pero mejor con objeto3D de Three.js

            meteor.setAttribute('shootable', '') //Añadimos atributo del componente creado más abajo para interactuar con el meteorito

            orbit.appendChild(meteor) //Añadimos el meteorito
        })
    })
}

//Función para registrar un nuevo componente a nuestra escena: Shootable
AFRAME.registerComponent('shootable', {
    init: function () {
        this.el.addEventListener('click', () => {
            //console.log('Destruido')
            this.el.parentNode.removeChild(this.el) //Eliminamos el elemento del DOM (se podría ocultar, pero estaría siempre ahí)
            document.querySelector('[text]').setAttribute('value', `${++score} METEORITOS FULMINADOS`)
        })
    }
})