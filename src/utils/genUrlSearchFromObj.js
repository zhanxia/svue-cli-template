export default function genUrlSearchFromObj(queryObj) {
    let searchStr = ''
    let keys = Object.keys(queryObj)
    keys.forEach(key => {
        searchStr += `${key}=${queryObj[key]}&`
    })
    searchStr = encodeURIComponent(searchStr.slice(0, -1))
    return '?' + searchStr
}