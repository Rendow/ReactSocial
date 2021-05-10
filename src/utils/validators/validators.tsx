export const required = (value: any) => {
    if (value) return undefined
    return 'Field is required'
}


export const maxLenghtCreator = (maxLenght: any) => (value: any) => {
    if (value && value.length > maxLenght)  return `Max length is ${maxLenght} symbols`
    return undefined
}
export const minLenghtCreator = (minLenght: any) => (value: any) => {
    if (value && value.length < minLenght)  return `Min length is ${minLenght} symbols`
    return undefined
}

