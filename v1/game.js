import loadGame from './utils/loader.js'
import { writeObject } from '../utils/debug/objects.js'

export default class game {
    constructor(path, root){
        this.path = path
        this.root = root
        console.log(`game definition: ${path + root}`)
    }

    start(contentId) {
        loadGame(this.path, this.root).then(game => {
            this.game=game
            writeObject('debug', this.game)
        })
    }

}
