
export default function genShareData (options, channel) {
    channel = channel || 'weixin'
    let shareData;
    let shareDataNew;
    let {
        link,
        imgUrl,
        title,
        desc,
        friendesc,
    } = options

    if (link === undefined ||
        imgUrl === undefined ||
        title === undefined ||
        desc === undefined ||
        friendesc === undefined
    ) {
        console.error('options should contains "link","imgUrl","title","desc" and "friendesc"')
    }

    if (channel !== 'weixin' &&
        channel !== 'jdjr' &&
        channel !== 'jdsc'
    ) {
        console.error('channel should be one of "weixin","jdjr","jdsc", and has a default value of "weixin')
    }

    let enLink = encodeURIComponent(link)
    enLink = encodeURIComponent(enLink);
    let shareLink = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx94f18f5f99c2e393&redirect_uri=http%3a%2f%2fjrappgw.jd.com%2fwxjdissue%2fjdissueWX%2fview%3ftype%3dsubjectPage%26url%3d${enLink}&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect`

    if (channel == "weixin") {
        shareData = {
            "appId": "",
            "imgUrl": imgUrl,
            "link": shareLink,
            "title": title,
            "desc": desc
        }
    } else if (channel == "jdjr") {
        shareData = {
            appId: '',
            img: imgUrl,
            link: shareLink,
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
                shareLink,
                shareLink,
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
            url: shareLink,
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
