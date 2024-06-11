var createUpdateForm = new Vue({
    el: '.update-box',
    data: {
        updateContent: "",
        updateAccessibility: "public"
    },
    methods: {
        createUpdate() {
            // 模拟从 API 获取数据
            const newUpdate = {
                "updateContent": this.updateContent,
                "updateAccessibility": this.updateAccessibility
            }

            doCreateUpdate(newUpdate)
        },
        changeUpdateAccessibility(updateAccessibility) {
            this.updateAccessibility = updateAccessibility
        }
    }
})

// 从服务端获取 组织信息 的脚本
function doCreateUpdate(newUpdate) {
    const data = JSON.stringify(newUpdate);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            // 刷新页面
            location.reload()
        }
    });

    xhr.open("POST", "/manager/createUpdate");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}