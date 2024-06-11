const app = new Vue({
    el: '#profileForm',
    data: {
        orgId: "",
        orgName: "",
        orgEmail: "",
        orgDsp: "",
        branchof: "",
        orgImg: "",
        organizationList: []
    },
    mounted() {
        // 在组件挂载后获取数据
        this.setOrgInfo().then(this.initOrganizationList)
    },
    methods: {
        setOrgInfo() {
            return (getOrgDetailFromBE().then(dataFromBE => {
                this.orgId = dataFromBE.org_id
                this.orgName = dataFromBE.org_name
                this.orgEmail = dataFromBE.org_email
                this.orgDsp = dataFromBE.org_description
                this.orgImg = dataFromBE.org_img
                this.branchof = dataFromBE.branchof
            }))
        },
        updateOrgDetail() {
            if (!this.orgName) {
                alert('Organization Name is required')
                return
            }

            const newProfile = {
                "orgId": this.orgId,
                "newName": this.orgName,
                "newEmail": this.orgEmail,
                "newDescription": this.orgDsp,
                "newBranchOf": this.branchof,
            }

            updateOrgDetail(newProfile)
        },
        initOrganizationList: function () {
            getOrganizationList().then(result => {
                console.log(result)
                this.organizationList = result
            })
        }
    }
})

// // 从服务端获取 组织信息 的脚本
function getOrgDetailFromBE() {
    const orgId = new URLSearchParams(window.location.search).get("orgId")
    return new Promise((resolve, reject) => {
        const data = null;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                resolve(JSON.parse(this.responseText))
            }
        });

        xhr.open("GET", `http://localhost:8848/admin/orgDetail?orgId=${orgId}`);
        xhr.setRequestHeader("Accept", "*/*");
        xhr.setRequestHeader("User-Agent", "Thunder Client (https://www.thunderclient.com)");

        xhr.send(data);
    })
}

function updateOrgDetail(newProfile) {
    const data = JSON.stringify(newProfile);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let error = JSON.parse(this.responseText).error
            if (error) {
                alert(error)
                location.reload()
                return
            }
            let result = JSON.parse(this.responseText).result
            alert(result)
            location.href = "/"
        }
    });

    xhr.open("POST", "http://localhost:8848/admin/updateOrgDetail");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}

function getOrganizationList() {
    return new Promise((resolve, reject) => {
        let data = null

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const result = JSON.parse(this.responseText).map(organizationInfo => {
                    return ({
                        name: organizationInfo.org_name,
                        id: organizationInfo.org_id
                    })
                })

                resolve(result)
            }
        };

        xhr.open("GET", "/organization/organizationList");
        xhr.setRequestHeader("Accept", "*/*");

        xhr.send(data);
    })
}