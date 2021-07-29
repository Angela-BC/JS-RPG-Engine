import loadObject from './request.js'

async function loadGame(path, file) {
    const gameObject = await loadObject(path + file)
    let result = {}
    console.log(gameObject)
    result = {
        ...gameObject,
        includes: undefined
    }
    if (gameObject.includes){
        for (let i=0; i<gameObject.includes.length; i++){
            const includeFile = gameObject.includes[i]
            const includeObject = await loadGame(path, includeFile)
            result = {
                ...result,
                ...includeObject
            }    
        }
    }
    return result
}

export default loadGame
