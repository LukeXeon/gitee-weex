const text = 'https://gitee.com/easypr/EasyPR/'

if (text && text.startsWith('https://gitee.com/') && text.length > 'https://gitee.com/'.length) {
    let subText = text.substring('https://gitee.com/'.length)
    const parts = subText.split('/')
    if (parts.length < 2) {

    }
    let user = parts[0]
    let repos = parts[1]
    console.log(parts)
}
