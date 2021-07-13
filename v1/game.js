class game {
    constructor(path){
        this.path = path
        console.log(`game definition: ${path}`)
    }
}

export default function(path){
    return new game(path)
}
