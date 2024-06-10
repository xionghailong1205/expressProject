// TODO: 写一个 mutation
var memberList = new Vue({
    el: '#memberList',
    data: {
        memberList: [

        ],
    },
    mounted() {
        // 在组件挂载后获取数据
        this.fetchData();
    },
    methods: {
        fetchData() {
            const setData = (dataFromBE) => {
                this.memberList = dataFromBE
            }

            getOrganizationList(setData)
        }
    }
})

function getOrganizationList(setData) {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            setData(JSON.parse(this.responseText))
        }
    });

    xhr.open("GET", "/manager/getUserList");
    xhr.setRequestHeader("Accept", "*/*");

    xhr.send(data);
}