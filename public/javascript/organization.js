// TODO: 写一个 mutation
var example1 = new Vue({
    el: '#app',
    data: {
        orgList: [

        ],
        hasOrg: false
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
                        orgId: orgInfo.org_id,
                        orgName: orgInfo.org_name,
                        orgDescription: orgInfo.org_description,
                        orgImge: orgInfo.org_img
                    }
                })
                this.orgList = orgList
            }

            const cookieString = document.cookie;
            const cookiePairs = cookieString.split('; ');

            for (let pair of cookiePairs) {
                pair = decodeURIComponent(pair)
                const [name, value] = pair.split('=');
                if (name === 'orgId') {
                    this.hasOrg = true
                }
            }

            getOrganizationList(setData)
        },
        handleViewUpdate(orgId) {
            location.href = `/publicUpdateListOfOrg?orgId=${orgId}`
        },
        handleJoinIn(orgId) {
            const requestBody = {
                orgId
            }

            joinInOrg(requestBody)
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

function joinInOrg(requestBody) {
    const data = JSON.stringify(requestBody);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const reuslt = JSON.parse(this.responseText).result
            alert(reuslt)
        }
    });

    xhr.open("POST", "/user/handleJoinIn");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}