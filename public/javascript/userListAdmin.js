console.log("代码注入")

var app = new Vue({
    el: '#app',
    data: {
        userList: [

        ],
    },
    mounted() {
        // 在组件挂载后获取数据
        this.fetchData();
    },
    methods: {
        fetchData() {
            getOrganizationList().then(userList => {
                console.log(userList)
                this.userList = userList
            })
        },
        handleDeleteUser(userId) {
            deleteUser(userId)
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
                const userList = JSON.parse(this.responseText)
                resolve(userList)
            }
        };

        xhr.open("GET", "/admin/getUserList");
        xhr.setRequestHeader("Accept", "*/*");

        xhr.send(data);
    })
}

function deleteUser(userId) {
    const data = JSON.stringify({
        userId
    });

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            alert(JSON.parse(this.responseText).result)
            location.reload()
        }
    });

    xhr.open("POST", "/admin/deleteUser");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}