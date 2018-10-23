import url from './url.js'
import axios from './axios.conf.js'
import * as mock from './mock'

let ISMOCK
ISMOCK = false
// ISMOCK = true
if (window.location.hostname === 'm.jd.jr.com') {
  ISMOCK = false
}
//获取参与并激活列表接口(奖券)
export function initRotaryTable (params) {
  if (ISMOCK) {
    console.warn('initRotaryTable' + ' is mocked.')
    return Promise.resolve(mock.initRotaryTable)
  }

  return axios.post(url.initRotaryTable, params).then(data => {
    if (typeof data === 'string') {
      data = JSON.parse(data)
    }
    return data
  })
}
