async function loadObject (path) {
    const response = await fetch(path)
    const result = await response.json()
    return await result
}

export default loadObject
