// array utilities

/*
 * getArrayValue
 *
 * creates an array from the provided value
 * value is null or undefined -> return an empty array
 * value is an array -> return value
 * value is a function -> use getArrayValue on function result
 * otherwise return an array with value as item
 */
export const getArrayValue = value => {
    // value is null or undefined?
    if (value === null || value === undefined) {
        return []
    }

    // value is an array?
    if (Array.isArray(value)) {
        return value
    }

    // value is a function?
    if (value instanceof Function) {
        // execute the function
        return getArrayValue(value())
    }

    return [value]
}
