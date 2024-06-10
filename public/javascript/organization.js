// TODO: 写一个 mutation
var example1 = new Vue({
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
            // 模拟从 API 获取数据
            const setData = (dataFromBE) => {
                const orgList = dataFromBE.map(orgInfo => {
                    return {
                        orgName: orgInfo.org_name ?? "尚未设置组织名",
                        orgDescription: orgInfo.org_description ?? "尚未设置介绍",
                        orgImge: orgInfo.org_img ?? "default.png"
                    }
                })
                this.orgList = orgList
            }

            getOrganizationList(setData)
        }
    }
})

function getOrganizationList(setData) {
    let data = null

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            const result = JSON.parse(this.responseText)
            setData(result)
        }
    };

    xhr.open("GET", "/organization/organizationList");
    xhr.setRequestHeader("Accept", "*/*");

    xhr.send(data);
}