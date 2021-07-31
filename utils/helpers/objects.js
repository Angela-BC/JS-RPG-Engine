export const flattenObject = o => {
    const result = new Map()
    for (const [key, value] of Object.entries(o)) {
        if (value instanceof Function) {
            throw 'Functions are not supported'
        }
        if (!(value instanceof Array) && (value instanceof Object) && value !== null && value !== undefined) {
            const entries = flattenObject(value)
            result.set(key, entries)
        } else {
            if (value !== undefined) {
                result.set(key, value)
            }
        }
    }
    return result
}

export const rebuildObject = entries => {
    const result = {}
    for (const [key, value] of entries){
        if (value instanceof Map){
            result[key] = rebuildObject(value)
        } else {
            result[key] = value
        }
    }
    return result
}

export const cloneObjectMap = map => {
    const result = new Map()
    for(const [key, value] of map) {
        if (value instanceof Map){
            result.set(key, cloneObjectMap(value))
        } else {
            result.set(key, value)
        }
    }
    return result
}

export const mergeObjectMaps = (m1, m2) => {
    const result = cloneObjectMap(m1)
    for(const [key, value] of m2) {
        if (value instanceof Map){
            if (result.has(key)){
                result.set(key, mergeObjectMaps(result.get(key), value))
            } else {
                result.set(key, cloneObjectMap(value))
            }
        } else {
            result.set(key, value)
        }
    }
    return result
}
