const app = new Vue({
    el: '#profileForm',
    data: {
        userName: "",
        email: "",
        name: "",
        number: "",
        organization: "",
        address: ""
    },
    mounted() {
        // 在组件挂载后获取数据
        this.setUserProfile();
    },
    methods: {
        setUserProfile() {
            getUserProfileFromBE().then(dataFromBE => {
                this.email = dataFromBE.email
                this.name = dataFromBE.name
                this.number = dataFromBE.number
                this.address = dataFromBE.address
                this.userName = dataFromBE.name
                this.organization = dataFromBE.organization
            })
        },
        updateUserProfile() {
            const newProfile = {
                "newName": this.name,
                "newNumber": this.number,
                "newAddress": this.address
            }

            callUpdateUserProfile(newProfile)
        }
    }
})

// // 从服务端获取 组织信息 的脚本
function getUserProfileFromBE() {
    return new Promise((resolve, reject) => {
        const data = null;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                resolve(JSON.parse(this.responseText).data)
            }
        });

        xhr.open("GET", "http://localhost:8848/user/getUserProfileData");
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