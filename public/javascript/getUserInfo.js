var userInfo = new Vue({
    el: '#userInfo',
    data: {
        userInfo: {
            name: "",
            role: ""
        }
    },
    mounted() {
        // 在组件挂载后获取数据
        this.getUserInfoFromCookie();
    },
    methods: {
        getUserInfoFromCookie() {
            // 模拟从 API 获取数据
            const cookieString = document.cookie;
            const cookiePairs = cookieString.split('; ');

            for (let pair of cookiePairs) {
                pair = decodeURIComponent(pair)
                const [name, value] = pair.split('=');
                if (name === 'name') {
                    this.userInfo.name = value
                }
                if (name === 'role') {
                    this.userInfo.role = value
                }
            }
        }
    }
})