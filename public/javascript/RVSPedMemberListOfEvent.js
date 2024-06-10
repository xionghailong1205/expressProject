var RVSPedMemberList = new Vue({
    el: '#RVSPedMemberList',
    data: {
        memberList: [
            {
                name: "test",
                email: "test",
                number: "test",
                rvspAt: "test",
            }
        ],
    },
    mounted() {
        // 在组件挂载后获取数据
        this.initMemberListFromBE();
    },
    methods: {
        initMemberListFromBE() {
            const setData = (dataFromBE) => {
                this.memberList = dataFromBE
            }
            getRVSPedMemberList(setData)
        }
    }
})

function getRVSPedMemberList(setData) {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const eventName = urlParams.get('eventName');

    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            setData(JSON.parse(this.responseText))
        }
    });

    xhr.open("GET", `http://localhost:8848/manager/getRVSPedMemberListOfEvent?eventName=${encodeURI(eventName)}`);
    xhr.setRequestHeader("Accept", "*/*");

    xhr.send(data);
}