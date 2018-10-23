import axios from 'axios'
import qs from 'qs'
import { Toast } from 'mint-ui';
import {getChannel} from "@/public/util.js";

// axios.defaults.timeout = 5000
let channel = getChannel();
// let requestChannel = channel == "jdjr" ? "/gw/generic/jrm/na/" : "/gw/generic/jrm/h5/";
let requestChannel  = "";
if(location.host.indexOf("minner") > -1 || location.host.indexOf("localhost") > -1){
  axios.defaults.baseURL = `//msinner.jr.jd.com${requestChannel}`;
}else{
  axios.defaults.baseURL = `//ms.jr.jd.com${requestChannel}`;
}

axios.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  } else {
    config.params = config.params || {}
  }

  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (res) {
  let {resultCode,resultMsg,resultData} = res.data;
  //未登录, 跳登录
  // let channel = getChannel();
  // if(resultCode == 3  &&  channel=="weixin" ){
  //   let enLink = encodeURIComponent(encodeURIComponent(location.href));
  //   let userUrl = `https://passport.m.jd.com/user/login.action?returnurl=http%3a%2f%2fjrappgw.jd.com%2fwxjdissue%2fjdissueWX%2fdispatch%3furl%3d${enLink}`;

  //   window.location.href = userUrl;
  //   return
  // }

  // if(Number(resultCode) !== 0){
  //   console.log('error', res)
  //   return {
  //     resultCode:resultCode,
  //     resultData:resultData
  //   }
  // }

  // return resultData;
  return {
    resultCode:resultCode,
    resultData:resultData
  }
}, function (error) {
  // Do something with response error
  // Toast("出错了！");
  console.error("error===",error);
  return Promise.reject(error)
})

// 让ajax请求头携带cookie
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
export default axios
