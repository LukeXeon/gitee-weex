import domino from "@/libs/domino";
import format from "@/libs/date.format";
import utils from "@/libs/utils";

export default {
    async getContributions(username) {
        const url = `https://gitee.com/${username}/contribution_calendar?year=`
        let content = await utils.fetch("GET", url, {
            Accept: '*/*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
        })
        const head = "$contributionContainer.html("
        let index = content.indexOf(head)
        let index2 = content.lastIndexOf(");")
        content = content.substring(index + head.length, index2)
        content = eval(content)
        content = "<html><head><title></title></head><body>" + content + "</body></html>"
        let document = domino.createDocument(content, true)
        let rawArray = document.querySelectorAll('div[data-content]')
        let result = []
        let now = parseInt(format.format(new Date(), 'Ymd'))
        for (let i = 0; i < rawArray.length; i++) {
            let item = rawArray[i]
            if (now >= parseInt(item.getAttribute('date'))) {
                result.push({
                    color: item.classList[1],
                    text: item.getAttribute('data-content')
                })
            } else {
                break
            }
        }
        return result
    },
    async getEnterprise(name) {
        const url = `https://gitee.com/${name}`
        let html = await utils.fetch("GET", url, {
            Accept: '*/*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
        })
        let document = domino.createDocument(html, true)
        let image = document.querySelector('img[src^="https://portrait.gitee.com/"]')
        let icon = image.getAttribute('src')
        let group = document.querySelector('div.extra')
        let email = group.childNodes[2].data.trim()
        let link = group.childNodes[5].getAttribute('href')
        return {
            icon: icon,
            email: email,
            link: link
        }
    }
}
