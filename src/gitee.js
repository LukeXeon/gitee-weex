import utils from "./utils"
import domino from './domino/index'

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

export default {
    loginUrl: `https://gitee.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`,
    async handleLogin(url) {
        if (url != null && url.startsWith(redirectUri)) {
            let code = utils.getQueryVariable(url.toString(), 'code')
            let data = await utils.request(
                'POST',
                `https://gitee.com/oauth/token?grant_type=authorization_code&code=${code}&client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}`,
                'jsonp'
            )
            await utils.setValue('access_token', data["access_token"])
            await utils.setValue('refresh_token', data["refresh_token"])
            let token = data["access_token"]
        }
    },
    async refreshToken() {
        let refreshToken = await utils.getValue('refresh_token')
        if (refreshToken == null) {
            return false;
        } else {
            try {
                let data = await utils.request(
                    "POST",
                    `https://gitee.com/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`,
                    'jsonp'
                )
                await utils.setValue('access_token', data["access_token"])
                return true;
            } catch (e) {
                return false;
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
    async getMyInfo() {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/user?access_token=${accessToken}`
        return await request("GET", url)
    },
    async getHotRepos() {
        const url = 'https://gitee.com/explore/all'
        let html = await utils.requestRaw("GET", url, {
            'User-Agent': 'Mozilla/5.0 (X11; U; Linux x86_64; zh-CN; rv:1.9.2.10) Gecko/20100922 Ubuntu/10.10 (maverick) Firefox/3.6.10'
        })
        let document = domino.createDocument(html, true)
    }
}