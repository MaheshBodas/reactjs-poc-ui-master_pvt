export function capitalize(strValue) {
    if(strValue && (strValue.length > 0)) {
        return strValue.charAt(0).toUpperCase() + strValue.slice(1)
    }
    return strValue
    
}