import loadGame from './utils/loader.js'

export default class game {
    constructor(path, root){
        this.path = path
        this.root = root
        console.log(`game definition: ${path}`)
    }

    start(contentId) {
        loadGame(this.path, this.root).then(game => {
            this.game=game
            console.log(this.game)
        })
    }

}
