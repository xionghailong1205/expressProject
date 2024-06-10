var eventList = new Vue({
    el: '#eventList',
    data: {
        eventList: [

        ],
    },
    mounted() {
        // 在组件挂载后获取数据
        this.initEventListFromBE();
    },
    methods: {
        initEventListFromBE() {
            const setData = (dataFromBE) => {
                this.eventList = dataFromBE
            }
            getEventList(setData)
        },
        navigateToRVSPMemberListPage(eventName) {
            const queryParam = encodeURI(eventName)
            location.href = `/manager/RVSPedMemberListOfEvent?eventName=${queryParam}`
        }
    }
})

function getEventList(setData) {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const result = JSON.parse(this.responseText)
            setData(result)
        }
    });

    xhr.open("GET", "/manager/eventList");
    xhr.setRequestHeader("Accept", "*/*");

    xhr.send(data);
}

// const startTime = dayjs(this.startTime).format('YYYY-MM-DD HH:mm:ss')