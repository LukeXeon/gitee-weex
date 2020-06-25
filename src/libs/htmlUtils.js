import domino from "@/libs/domino";
import format from "@/libs/date.format";
import utils from "@/libs/utils";

export default {
    createDocument(content) {
        let html = "<html><head><title></title></head><body>" + content + "</body></html>"
        return domino.createDocument(html, true)
    },
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
        let document = this.createDocument(content)
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
}
