import utils from "./utils"
import domino from './domino/index'
import hljs from 'highlight.js'

const clientId = 'c5544e74d50886f97db7dc3d0e329a50150073627894a600ad15bc990dd8a7f0'
const clientSecret = '17c6a2209b1f8c732388d49713cdf08ab20aa67ab8aa38a799d490c821275d78'
const redirectUri = 'http://weex.gitee.client/login'

async function request(method, url, body) {
    return await utils.request(
        method,
        url,
        "jsonp",
        body,
        {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    )
}

let userInfoCache = null;

export default {
    loginUrl: `https://gitee.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`,
    async handleLogin(url, fun) {
        if (url != null && url.startsWith(redirectUri)) {
            let code = utils.getQueryVariable(url.toString(), 'code')
            let data = await utils.request(
                'POST',
                `https://gitee.com/oauth/token?grant_type=authorization_code&code=${code}&client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}`,
                'jsonp'
            )
            utils.debug(JSON.stringify(data))
            await utils.setValue('access_token', data["access_token"])
            await utils.setValue('refresh_token', data["refresh_token"])
            fun()
        }
    },
    async isLogin() {
        let refreshToken = await utils.getValue('refresh_token')
        if (refreshToken == null) {
            return false;
        } else {
            try {
                await this.loadMyInfo()
                return true
            } catch (e) {
                try {
                    let data = await utils.request(
                        "POST",
                        `https://gitee.com/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`,
                        'jsonp'
                    )
                    await utils.setValue('access_token', data["access_token"])
                    return true;
                } catch (e2) {
                    return false;
                }
            }
        }
    },
    async cancelFollowing(username, isFollowing) {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/user/following/${username}?access_token=${accessToken}`
        return await request("DELETE", url)
    },
    async following(username, isFollowing) {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/user/following/${username}`
        return await request("PUT", url, {
            "access_token": accessToken
        })
    },
    async getUser(username) {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/users/${username}?access_token=${accessToken}`
        return await request("GET", url)
    },
    async getUserFollowers(username, page, countAtPage) {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/users/${username}/followers?access_token=${accessToken}&page=${page}&per_page=${countAtPage}`
        return await request("GET", url)
    },
    async getUserFollowing(username, page, countAtPage) {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/users/${username}/following?access_token=${accessToken}&page=${page}&per_page=${countAtPage}`
        return await request("GET", url)
    },
    async star(owner, repo) {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/user/starred/${owner}/${repo}`
        return await request("PUT", url, {
            "access_token": accessToken
        })
    },
    async getStars(page, countAtPage) {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/user/starred?access_token=${accessToken}&sort=created&direction=desc&page=${page}&per_page=${countAtPage}`
        return await request("GET", url)
    },
    async cancelStar(owner, repo) {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/user/starred/${owner}/${repo}?access_token=${accessToken}`
        return await request("DELETE", url)
    },
    async watch(owner, repo) {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/user/subscriptions/${owner}/${repo}`
        return await request("PUT", url, {
            "access_token": accessToken
        })
    },
    async cancelWatch(owner, repo) {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/user/subscriptions/${owner}/${repo}?access_token=${accessToken}`
        return await request("DELETE", url)
    },
    async getEvents(username, page, countAtPage) {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/users/1/received_events?access_token=${accessToken}&page=${page}&per_page=${countAtPage}`
        return await request("GET", url)
    },
    async getMyRepos(page, countAtPage) {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/user/repos?access_token=${accessToken}&visibility=all&sort=full_name&direction=asc&page=${page}&per_page=${countAtPage}`
        return await request("GET", url)
    },
    async getOtherRepos(username, page, countAtPage) {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/users/${username}/repos?access_token=${accessToken}&type=all&sort=full_name&page=${page}&per_page=${countAtPage}`
        return await request("GET", url)
    },
    async search(text, lang, page, countAtPage) {
        let accessToken = await utils.getValue('access_token')
        let url = `https://gitee.com/api/v5/search/repositories?access_token=${accessToken}&q=${text}&page=${page}&per_page=${countAtPage}&order=desc`
        if (lang != null) {
            url += `&language=${encodeURI(lang)}`
        }
        return await request("GET", url)
    },
    async loadMyInfo(useCache = false) {
        if (useCache && !(userInfoCache === null)) {
            return userInfoCache
        }
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/user?access_token=${accessToken}`
        let data = await request("GET", url)
        let login = data['login']
        userInfoCache = await this.getUser(login)
        return userInfoCache
    },
    async getHotRepos() {

    },
    async getContributions(username, year) {
        const url = `https://gitee.com/${username}/contribution_calendar?year=${year}`
        let content = await utils.requestRaw("GET", url, {
            Accept: '*/*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
        })
        const head = "$contributionContainer.html("
        let index = content.indexOf(head)
        let index2 = content.lastIndexOf(");")
        content = content.substring(index + head.length, index2)
        content = eval(content)
        content = "<html><head><title></title></head><body>" + content + "</body></html>"
        content = domino.createDocument(content)
    },

}