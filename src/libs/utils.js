const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage')
const modal = weex.requireModule('modal')
const animation = weex.requireModule('animation')
const navigator = weex.requireModule('navigator')
const dom = weex.requireModule('dom')
const clipboard = weex.requireModule('clipboard')

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
    removeKey(key) {
        return new Promise(function (resolve) {
            storage.removeItem(key, function () {
                resolve()
            })
        })
    },
    debug(text) {
        modal.alert({
            message: text.toString()
        })
    },
    animate(vnode, options) {
        return new Promise(function (resolve) {
            animation.transition(vnode, options, function () {
                resolve()
            })
        })
    },
    jumpTo(toUrl, query) {
        let bundleUrl = weex.config.bundleUrl;
        bundleUrl = String(bundleUrl);
        let nativeBase;
        let native;
        if (WXEnvironment.platform === 'Android') {
            nativeBase = 'file://assets/dist/';
            native = nativeBase + toUrl + ".js";
        } else if (WXEnvironment.platform === 'iOS') {
            nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
            native = nativeBase + toUrl + ".js";
        } else {
            let host = 'localhost:8081';
            let matches = /\/\/([^\/]+?)\//.exec(bundleUrl);
            if (matches && matches.length >= 2) {
                host = matches[1];
            }

            //此处需注意一下,tabbar 用的直接是jsbundle 的路径,但是navigator是直接跳转到新页面上的.
            if (typeof window === 'object') {
                nativeBase = 'http://' + host + '/';
            } else {
                nativeBase = 'http://' + host + '/';
            }
            native = nativeBase + toUrl + ".html";
        }
        let url = native
        if (query != null) {
            let isFirst = true
            for (let k in query) {
                if (isFirst) {
                    isFirst = false
                    url += `?${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`
                } else {
                    url += `&${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`
                }
            }
        }

        navigator.push({
            url: url,
            animated: "true"
        })
    },
    getComponentRect(vnode) {
        return new Promise(function (resolve) {
            dom.getComponentRect(vnode, function (e) {
                resolve(e)
            })
        })
    },
    copy(text) {
        clipboard.setString(text)
    },
    getClipboard() {
        return new Promise(function (resolve) {
            clipboard.getString(function () {
                resolve()
            })
        })
    },
    getRandomColor() {
        return '#' + '0123456789abcdef'.split('')
            .map(function (v, i, a) {
                return i > 5 ? null : a[Math.floor(Math.random() * 16)]
            }).join('');
    },
    timeout(time) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve()
            }, time)
        })
    }
}