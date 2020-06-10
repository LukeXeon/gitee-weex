const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage')
const modal = weex.requireModule('modal')
const animation = weex.requireModule('animation')

export default {
    request(method, url, type, body, headers) {
        return new Promise(function (resolve, reject) {
            stream.fetch({
                method: method,
                url: url,
                body: body,
                type: type,
                headers: headers
            }, function (event) {
                if (event.ok) {
                    resolve(event.data)
                } else {
                    reject(event.status)
                }
            }, function () {

            })
        })
    },
    fetch(method, url, headers) {
        return new Promise(function (resolve) {
            stream.sendHttp({
                method: "GET",
                url: url,
                header: headers
            }, function (e) {
                resolve(e)
            });
        })
    },
    getQueryVariable(url, variable) {
        let urlParams = url.split("?")[1];
        //或者url.search获取参数字符串
        let paramArray = urlParams.split("&");
        let len = paramArray.length;
        let paramObj = {};//json对象
        let arr = [];//数组对象
        for (let i = 0; i < len; i++) {
            arr = paramArray[i].split("=");
            paramObj[arr[0]] = arr[1];
        }
        for (let key in paramObj) {
            if (key === variable) {
                return paramObj[variable];
            }
        }
    },
    setValue(key, value) {
        return new Promise(function (resolve) {
            storage.setItem(key, value, function () {
                resolve()
            })
        })
    },
    getValue(key) {
        return new Promise(function (resolve) {
            storage.getItem(key, function (e) {
                resolve(e.result === 'success' ? e.data : null)
            })
        })
    },
    debug(text) {
        modal.alert({
            message: text
        })
    },
    animate(vnode, options) {
        return new Promise(function (resolve) {
            animation.transition(vnode, options, function () {
                resolve()
            })
        })
    }
}