import { loadObject } from '../../utils/request.js'
import { getArrayValue } from '../../utils/helpers/arrays.js'
import { rebuildObject, flattenObject, mergeObjectMaps } from '../../utils/helpers/objects.js'

const includesKey = 'includes'

function getIncludes(entries){
    var result = new Map()
    if (entries.has(includesKey)){
        result.set('.', entries.get(includesKey))
        entries.delete(includesKey)
    }
    for (const [key, value] of entries){
        if (value instanceof Map){
            const subIncludes = getIncludes(value)
            if (subIncludes.size > 0){
                result.set(key, subIncludes)
            }
        }
    }
    return result
}

async function resolveIncludesToSingleObject(path, inObject){
    const entries = await resolveIncludes(path, inObject)
    const result = rebuildObject(entries)
    return result
}

async function loadIncludes(path, includes){
    let result = new Map()
    for(const[key, value] of includes){
        let includeResult
        if (value instanceof Map){
            includeResult = await loadIncludes(path, value)
        } else {
            const includeFiles = getArrayValue(value)
            includeResult = new Map()
            for(const includeFile of includeFiles){
                const includeObject = await loadObject(path + includeFile)
                const includeEntries = await resolveIncludes(path, includeObject)
                includeResult = mergeObjectMaps(includeResult, includeEntries)
            }
        }
        if (includeResult.has('.')){
            includeResult = includeResult.get('.')
        }
        result.set(key, includeResult)
    }
    return result
}

async function resolveIncludes(path, inObject) {
    const entries = flattenObject(inObject)
    var includes = getIncludes(entries)
    var loadedIncludes = await loadIncludes(path, includes)
    let result = entries
    for (const [key,value] of loadedIncludes){
        if (key === '.'){
            result = mergeObjectMaps(result, value)
        } else {
            result.set(key, mergeObjectMaps(result.get(key), value))
        }
    }
    return result
}

async function loadGame(path, file) {
    const gameObject = await loadObject(path + file)
    const result = await resolveIncludesToSingleObject(path, gameObject)
    console.log('==>')
    console.log(result)
    return result
}

export default loadGame
