const stream = weex.requireModule('stream')
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
            })
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
    }
}