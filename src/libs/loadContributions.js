import gitee from "@/libs/gitee";
import domino from "@/libs/domino";
import format from "@/libs/date.format";

export default async function loadContributions(user) {
    let content = await gitee.getContributions(user)
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
}
