export default function parseUrlSearchToObj() {
    let searchStr = decodeURIComponent(window.location.search)
    let queryArr = searchStr.slice(1).split('&')
    let result = {}
    queryArr.forEach(item => {
        let temp = item.split('=')
        if (temp[1]) {
            result[temp[0]] = temp[1]
        }
    })
    return result
}