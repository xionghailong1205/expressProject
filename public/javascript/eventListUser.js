console.log("eventList User")

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
            getRVSPedEventList().then((RVSPedEventList) => {
                console.log(RVSPedEventList)
                getEventList(setData, RVSPedEventList)
            })
        },
        RVSPToEvent(eventName) {
            const eventInfo = {
                eventName
            }

            doRVSP(eventInfo)
        }
    }
})

function getEventList(setData, RVSPedEventList) {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let eventList = JSON.parse(this.responseText)
            if (eventList.error) {
                alert(eventList.error)
                location.href = '/'
            }

            console.log(eventList)
            eventList = eventList.map(eventInfo => {

                const hasRVSPed = Boolean(RVSPedEventList.find(RVSPedEventInfo => {
                    return RVSPedEventInfo.eventName === eventInfo.eventTitle
                }))

                return ({
                    ...eventInfo,
                    hasRVSPed
                })
            })
            console.log(eventList)
            setData(eventList)
        }
    });

    xhr.open("GET", "/manager/eventList");
    xhr.setRequestHeader("Accept", "*/*");

    xhr.send(data);
}

function getRVSPedEventList() {
    return new Promise((resolve, reject) => {
        const data = null;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                const RVSPedEventList = JSON.parse(this.responseText)
                resolve(RVSPedEventList)
            }
        });

        xhr.open("GET", "/user/getRVSPedEventList");
        xhr.setRequestHeader("Accept", "*/*");

        xhr.send(data);
    })
}

function doRVSP(eventInfo) {
    const data = JSON.stringify(eventInfo);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const result = JSON.parse(this.responseText).result
            alert(result)
            location.reload()
        }
    });

    xhr.open("POST", "/user/doRVSP");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}

// const startTime = dayjs(this.startTime).format('YYYY-MM-DD HH:mm:ss')