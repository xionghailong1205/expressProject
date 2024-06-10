console.log("代码注入")

var app = new Vue({
    el: '#app',
    data: {
        orgList: [

        ],
    },
    mounted() {
        // 在组件挂载后获取数据
        this.fetchData();
    },
    methods: {
        fetchData() {
            getOrganizationList().then(orgList => {
                console.log(orgList)
                this.orgList = orgList
            })
        }
    }
})

// 从服务端获取 组织信息 的脚本
function getOrganizationList() {
    return new Promise((resolve, reject) => {
        let data = null

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const orgList = JSON.parse(this.responseText)
                resolve(orgList)
            }
        };

        xhr.open("GET", "/admin/getOrgList");
        xhr.setRequestHeader("Accept", "*/*");

        xhr.send(data);
    })
}