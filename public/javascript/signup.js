const app = new Vue({
    el: '.login_form',
    data: {
        role: 'user',
        errors: {
        },
        name: "",
        email: "",
        passWord: "",
        cpassWord: "",
        phoneNumber: "",
        errorMsgFromBE: "",
        organizationList: [],
        orgId: ""
    },
    mounted() {
        // 在组件挂载后获取数据
        this.initOrganizationList();
    },
    methods: {
        changeRole: function (newRole) {
            this.role = newRole
        },
        checkForm: function (e) {
            const setErrorMsgFromBE = (msgFromBE) => {
                this.errorMsgFromBE = msgFromBE
            }

            this.errors = {
            }
            if (!this.email) {
                this.errors.email = "Email required."
            }
            if (!this.name) {
                this.errors.name = 'Name required.'
            }
            if (!this.passWord) {
                this.errors.passWord = "PassWord required."
            }
            if (this.cpassWord !== this.passWord) {
                this.errors.cpassWord = 'Two passwords do not match'
            }

            if (this.role === "manager") {
                if (!this.orgId) {
                    this.errors.orgId = 'organization is required'
                }
            }

            console.log(this.errors)

            let errorNumber = Object.keys(this.errors)

            if (errorNumber.length === 0) {
                console.log("通过验证")

                const loginInfo = JSON.stringify({
                    "name": this.name,
                    "email": this.email,
                    "password": this.passWord,
                    "orgId": this.orgId
                })

                doSignUp(loginInfo, setErrorMsgFromBE, this.role)
            }



            e.preventDefault();
        },
        initOrganizationList: function () {
            getOrganizationList().then(result => {
                this.organizationList = result
            })
        }
    }
})

// 从服务端获取 组织信息 的脚本
function doSignUp(loginInfoJSON, setErrorMsgFromBE, role) {
    const data = loginInfoJSON

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText)
            const errorMsgFromBE = res?.error
            if (errorMsgFromBE) {
                setErrorMsgFromBE(errorMsgFromBE)
            } else {
                console.log(res.result)
                const result = res.result
                alert(result)
                window.location.href = "/login";
            }
        }
    });

    xhr.open("POST", `/handleSignup?role=${role}`);
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