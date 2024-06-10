console.log("导入 adminProfile")

const app = new Vue({
    el: '#profileForm',
    data: {
        name: "",
        email: "",
        number: "",
    },
    mounted() {
        // 在组件挂载后获取数据
        this.setUserProfile();
    },
    methods: {
        setUserProfile() {
            getAdminProfileFromBE().then(dataFromBE => {
                this.name = dataFromBE.name
                this.email = dataFromBE.email
                this.number = dataFromBE.number
            })
        },
        // updateUserProfile() {
        //     const newProfile = {
        //         "newName": this.name,
        //         "newNumber": this.number
        //     }

        //     callUpdateUserProfile(newProfile)
        // }
    }
})

// // 从服务端获取 组织信息 的脚本
function getAdminProfileFromBE() {
    return new Promise((resolve, reject) => {
        const data = null;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                const result = JSON.parse(this.responseText)[0]
                console.log(result)
                resolve(result)
            }
        });

        xhr.open("GET", "/admin/getAdminProfile");
        xhr.setRequestHeader("Accept", "*/*");

        xhr.send(data);
    })
}

function callUpdateUserProfile(newProfile) {
    const data = JSON.stringify(newProfile);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const result = JSON.parse(this.responseText)
            if (result?.error) {
                console.log(result.error)
            } else {
                alert(result.result)
                location.reload()
            }
        }
    });

    xhr.open("POST", "/user/updateUserProfile");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}