const app = new Vue({
    el: '.login_form',
    data: {
        role: 'user',
        errors: {
        },
        email: "",
        passWord: "",
        errorMsgFromBE: "",
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
            if (!this.passWord) {
                this.errors.passWord = 'Password required.'
            }

            let errorNumber = Object.keys(this.errors)

            if (errorNumber.length === 0) {
                const loginInfo = JSON.stringify({
                    "email": this.email,
                    "password": this.passWord
                })

                doLogIn(loginInfo, setErrorMsgFromBE, this.role)
            }

            e.preventDefault();
        }
    }
})

// 从服务端获取 组织信息 的脚本
function doLogIn(loginInfoJSON, setErrorMsgFromBE, role) {
    console.log(role)
    const data = loginInfoJSON

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText)
            const errorMsgFromBE = res?.error
            if (errorMsgFromBE) {
                setErrorMsgFromBE(errorMsgFromBE)
            } else {
                console.log(res.result)
                switch (role) {
                    case "user": {
                        window.location.href = "/";
                        break
                    }
                    case "manager": {
                        window.location.href = "/";
                        break
                    }
                    case "admin": {
                        window.location.href = "/";
                        break
                    }
                    default: {
                        console.log("还未编写")
                    }
                }
            }
        }
    });

    xhr.open("POST", `/handleLogin?role=${role}`);
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}