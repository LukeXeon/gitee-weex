import utils from "./utils"
import colors from "@/res/colors";

const clientId = 'c5544e74d50886f97db7dc3d0e329a50150073627894a600ad15bc990dd8a7f0'
const clientSecret = '17c6a2209b1f8c732388d49713cdf08ab20aa67ab8aa38a799d490c821275d78'
const redirectUri = 'http://weex.gitee.client/login'

async function request(method, url, body) {
    return await utils.request(
        method,
        url,
        "json",
        body,
        {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    )
}


let cache = {
    userInfo: null,
    languages: []
}

export default {
    loginUrl: `https://gitee.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`,
    async handleLogin(url) {
        if (url != null && url.startsWith(redirectUri)) {
            let code = utils.getQueryVariable(url.toString(), 'code')
            let data = await utils.request(
                'POST',
                `https://gitee.com/oauth/token?grant_type=authorization_code&code=${code}&client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}`,
                'json',
                {},
                {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
                }
            )
            await utils.setValue('access_token', data["access_token"])
            await utils.setValue('refresh_token', data["refresh_token"])
            return true
        } else {
            return false
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
                        'json'
                    )
                    let accessToken = data["access_token"]
                    if (accessToken === null || accessToken === undefined || accessToken === "") {
                        return false
                    }
                    await utils.setValue('access_token', accessToken)
                    return true;
                } catch (e2) {
                    return false;
                }
            }
        }
    },
    async cancelFollowing(username) {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/user/following/${username}?access_token=${accessToken}`
        return await request("DELETE", url)
    },
    async following(username) {
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
        const url = `https://gitee.com/api/v5/user/starred/${owner}/${repo}?access_token=${accessToken}`
        return await request("PUT", url)
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
        if (useCache && !(cache.userInfo === null)) {
            return cache.userInfo
        }
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/user?access_token=${accessToken}`
        let data = await request("GET", url)
        let login = data['login']
        cache.userInfo = await this.getUser(login)
        return cache.userInfo
    },
    async getLatest(page = 1) {
        const url = `https://gitee.com/api/v3/projects/latest?page=${page}`
        return await request("GET", url)
    },
    async getFeatured(page = 1) {
        const url = `https://gitee.com/api/v3/projects/featured?page=${page}`
        return await request("GET", url)
    },
    async getPopular(page = 1) {
        const url = `https://gitee.com/api/v3/projects/popular?page=${page}`
        return await request("GET", url)
    },
    async getContributions(username, year) {
        const url = `https://gitee.com/${username}/contribution_calendar?year=${year}`
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
        return content
    },
    async getLanguageProject(langId, page) {
        const url = `https://gitee.com/api/v3/projects/languages/${langId}?page=${page}`
        return await request("GET", url)
    },
    async getRepos(user, repos) {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/repos/${user}/${repos}?access_token=${accessToken}`
        return await request("GET", url)
    },
    getLanguageColor(lang) {
        let colorItem = colors[lang]
        let color = null
        if (colorItem) {
            color = colorItem['color']
        }
        color = color || '#dddddd'
        return color
    },
    async getPulls(user, repos) {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/repos/${user}/${repos}/pulls?access_token=${accessToken}&state=open&sort=created&direction=desc`
        return await request("GET", url)
    },
    async getBranches(user, repos) {
        let accessToken = await utils.getValue('access_token')
        const url = `https://gitee.com/api/v5/repos/${user}/${repos}/branches?access_token=${accessToken}`
        return await request("GET", url)
    },
    async getHomepage(user, repos, branch) {
        const url = `https://gitee.com/${user}/${repos}/tree/${branch}`
        return await utils.fetch("GET", url, {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
        })
    }
}