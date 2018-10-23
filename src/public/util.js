
export function getChannel() {
  let channel = "";

  if ($.device.weixin) {
    channel = "weixin"
  } else if ($.device.jdapp) {
    // channel =  getUrlParam("channel") || "jdsc";
    channel = "jdsc";
  } else if ($.device.jdjr) {
    channel = "jdjr"
  }

  return channel;
}
export function getUrlHost() {
  let host = "";

  if (location.host.indexOf("minner") > -1 || location.host.indexOf("localhost") > -1) {
    host = window.location.protocol + '//minner.jr.jd.com/';
  } else {
    host = window.location.protocol + '//m.jr.jd.com';
  }

  return host;
}

export function getApiHost() {
  let apiHost = "";

  if (location.host.indexOf("minner") > -1 || location.host.indexOf("localhost") > -1) {
    apiHost = window.location.protocol + '//msinner.jr.jd.com';
  } else {
    apiHost = window.location.protocol + '//ms.jr.jd.com';
  }

  return apiHost;
}

export function getUrlParam(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);

  if (r != null) return decodeURIComponent(r[2]);
  return null;
}

export function parseUrlSearchToObj() {
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

export function genUrlSearchFromObj(queryObj) {
  let searchStr = ''
  let keys = Object.keys(queryObj)
  keys.forEach(key => {
    searchStr += `${key}=${queryObj[key]}&`
  })
  searchStr = encodeURIComponent(searchStr.slice(0, -1))
  return '?' + searchStr
}

export function getCookie(name) {
  var strcookie = document.cookie;//获取cookie字符串
  var arrcookie = strcookie.split("; ");//分割
  //遍历匹配
  for (var i = 0; i < arrcookie.length; i++) {
    var arr = arrcookie[i].split("=");
    if (arr[0] == name) {
      return arr[1];
    }
  }
  return "";
}
//获取actcode,预发和生产不同
export function getActcode() {
  let code = "";

  if (location.host.indexOf("minner") > -1 || location.host.indexOf("localhost") > -1) {
    code = "F527098780";
  } else {
    code = "18E16D3C35";
  }

  return code;
}
//跳转到登录页
export function goToLoginPage() {
  let pName = location.pathname || "/flowh5/2018/10/grab-ticket/index.html";
  let link = "";

  if (pName.indexOf("friend") > -1) {
    let friendData = getUrlParam("friendData");
    link = `${getUrlHost()}/flowh5/2018/10/grab-ticket/friend.html?friendData=${friendData}`;
  } else {
    link = `${getUrlHost()}${pName}`;
  }

  let enLink = encodeURIComponent(link)
  // enLink = encodeURIComponent(enLink);
  // let shareLink = `https://passport.m.jd.com/user/login.action?returnurl=http%3a%2f%2fjrappgw.jd.com%2fwxjdissue%2fjdissueWX%2fdispatch%3furl%3d${enLink}`;
  // let shareLink = `https://plogin.m.jd.com/user/login.action?appid=697&logintype=sms_login&returnurl=http%3A%2F%2Fm.jd.com${enLink}`;
  let shareLink = `https://plogin.m.jd.com/user/login.action?appid=697&logintype=sms_login&returnurl=${enLink}`;

  window.location.href = shareLink;
}
//跳转到登录页--助力页
export function goToLoginPage2(enBpin) {
  let actCode = getActcode();
  let reqData = {
    actCode: actCode,
    enBpin: enBpin
  }
  reqData = JSON.stringify(reqData);
  let str = `reqData=${reqData}`;
  str = encodeURI(str);
  let link = `${getApiHost()}/gw/generic/jrm/redirect/m/fromShareRedirect?${str}`;
  // let link = `${getUrlHost()}/flowh5/2018/10/grab-ticket/redirect.html?enBpin=${enBpin}`;
  // window.location.href = link;

  // let enLink = encodeURI(link)
  // let shareLink = `https://passport.m.jd.com/user/login.action?returnurl=http%3a%2f%2fjrappgw.jd.com%2fwxjdissue%2fjdissueWX%2fdispatch%3furl%3d${enLink}`;
  // let shareLink = `https://plogin.m.jd.com/user/login.action?appid=697&logintype=sms_login&returnurl=http%3A%2F%2Fm.jd.com${enLink}`;
  let shareLink = `https://plogin.m.jd.com/user/login.action?appid=697&logintype=sms_login&returnurl=${link}`;
  window.location.href = shareLink;
}

function genShareData(enPin) {
  let channel = getChannel();
  let actCode = getActcode();
  let reqData = {
    actCode: actCode,
    enBpin: enPin
  }
  reqData = JSON.stringify(reqData);
  let str = `reqData=${reqData}`;
  str = encodeURI(str);
  let link = `${getApiHost()}/gw/generic/jrm/redirect/m/fromShareRedirect?${str}`;
  let imgUrl = 'https://m.360buyimg.com/jrqb/jfs/t1/4077/28/4316/4114/5b9bad12Ed8c7d79d/8459a53e1459ebc4.jpg';
  let title = '快！帮我点一下！我在抢京东11.11福利，最高1111立减券';
  let desc = '点这里→';
  let friendesc = '快！帮我点一下！我在抢京东11.11福利，最高1111立减券';
  let shareData, shareDataNew;
  if (channel == "weixin") {
    shareData = {
      "appId": "",
      "imgUrl": imgUrl,
      "link": link,
      "title": title,
      "desc": desc
    }
  } else if (channel == "jdjr") {
    shareData = {
      appId: '',
      img: imgUrl,
      link: link,
      desc: desc,
      title: title,
      friendesc: friendesc,
      type: ''
    };
    shareDataNew = { //以上是老版分享内容配置，这个字段是新版分享内容配置
      "isLogin": "0",
      "id": "",
      "linkSubtitle": desc,
      "imageUrl": imgUrl,
      "link": [
        link
      ],
      "linkTitle": title,
      "channels": ["0", "1"],
      "productName": "",
      "productId": ""
    }
  } else if (channel == "jdsc") {
    shareData = {
      title: title,
      content: desc,
      url: link,
      img: imgUrl,
      channel: 'Wxfriends,Wxmoments',
      callback: null
    }
  }
  return {
    shareData,
    shareDataNew
  }
}

export function getShareInfo(enPin) {
  let { shareData } = genShareData(enPin);
  return shareData
}
export function getShareInfoNew(enPin) {
  let { shareDataNew } = genShareData(enPin)
  return shareDataNew
}
/////////////////////////////跳转相关////////////////////////////////
//跳转到不同渠道下载页
export function goSourceDownLoad() {
  let url = "https://m.jr.jd.com/spe/downloadApp/index.html?id=308&activityid=1003";
  let source = getUrlParam("source");

  if (source) {
    let filterSource = data_source_100001051.sourceList.filter((item) => {
      return item.sourceNum == source;
    })
    url = filterSource[0].sourceSrc;
  }

  window.location.href = url;
}
//跳转到单纯下载页
export function goDownLoadPage() {
  window.location.href = "https://m.jr.jd.com/spe/downloadApp/index.html?id=308&activityid=1003";
}
//跳转到主会场下载页
export function goDownLoadMainPage() {
  window.location.href = "https://m.jr.jd.com/spe/downloadApp/index.html?id=475&activityid=1001";
}


//去主会场
export function goMainVenue() {
  let channel = getChannel();
  let hre = '';
  if (location.host.indexOf("minner") > -1 || location.host.indexOf("localhost") > -1) {
    hre = 'http://minner.jr.jd.com/activity/mainMeetingpalace';
  } else {
    hre = 'https://m.jr.jd.com/activity/promotion';
  }
  if (channel == "jdjr") {
    //jdjr内直接跳转的活动主会场链接 
    window.location.href = `${hre}/finance.html`;
  } else if (channel == "jdsc") {
    window.location.href = `${hre}/index.html`;
  } else if (channel == "weixin") {
    window.location.href = `${hre}/wq.html`;
  } else {
    if (location.host.indexOf("minner") > -1 || location.host.indexOf("localhost") > -1) {
      // window.location.href = `${window.location.href}id=475&acitvityId=1007`
      goSourceDownLoad();
      // window.location.href = "https://m.jr.jd.com/spe/downloadApp/index.html?id=475&activityid=1007";
    } else {
      goSourceDownLoad();
      // window.location.href = "https://m.jr.jd.com/spe/downloadApp/index.html?id=475&activityid=1001";
    }
  }
}
//去app我的优惠券
export function goAppMyTicket() {
  //所有渠道都可以跳转到
  window.location.href = "https://m.jr.jd.com/mjractivity/rn/coupon-rn/index.html?RN=coupon-rn";
}

//去app活动领取页
export function goAppReceivePage() {
  let channel = getChannel();

  if (channel == "jdjr") {
    //jdjr内直接跳转的活动领取页
    window.location.href = `${getUrlHost}/flowh5/2018/10/grab-ticket/receive.html`;
  } else {
    if (location.host.indexOf("minner") > -1 || location.host.indexOf("localhost") > -1) {
      window.location.href = "https://m.jr.jd.com/spe/downloadApp/index.html?id=470&activityid=1008";
    } else {
      window.location.href = "https://m.jr.jd.com/spe/downloadApp/index.html?id=470&activityid=1002";
    }
  }
}


export function downloadImgs(callback) {
  var imgNeed = [
    ''
  ],
    // 需要预加载的图片地址列表
    len = imgNeed.length,
    i = 0;

  function loadImg(i) {
    var img = new Image();
    img.src = imgNeed[i];
    img.onload = function() {
      if (i++ < len - 1) {
        loadImg(i)
      } else {
        console.log('图片预加载完成');
        callback();
      }
    }
  }
  loadImg(i);
}
////////////////////////////////////////////////











export function clearAllCookie() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}

export function goLogout() {
  let actCode = getUrlParam("actCode"),
    markId = getUrlParam("markId"),
    actChannel = getUrlParam("actChannel") || "test";

  let link = `${getUrlHost()}/flowh5/team-bag/dist/activity.html?&actCode=${actCode}&markId=${markId}&actChannel=${actChannel}`;
  let enLink = encodeURIComponent(link);
  //业务域名及appid
  const host = "minner.jr.jd.com",
    appid = "100";
  p_logout.logout(callback, host, appid);

  function callback(ret) {
    console.log("ret===", ret)
    if (ret.errcode == 0) {
      //注销成功
      window.location.href = "//passport.m.jd.com/user/login.action?v=t&sid=&returnurl=" + enLink;
    } else {
      window.location.href = "//passport.m.jd.com/user/login.action?v=t&sid=&returnurl=" + enLink;
      //注销失败 + ret.message
    }
  }
}
