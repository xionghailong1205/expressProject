const app = new Vue({
    el: '#createForm',
    data: {
        eventTitle: "",
        eventContent: "",
        startTime: "",
        endTime: "",
    },
    methods: {
        doCreate() {
            if (!this.eventTitle || !this.eventContent || !this.startTime || !this.endTime) {
                alert("please complete form")
                return
            }

            const startTime = dayjs(this.startTime).format('YYYY-MM-DD HH:mm:ss')
            const endTime = dayjs(this.endTime).format('YYYY-MM-DD HH:mm:ss')

            const eventData = {
                "eventTitle": this.eventTitle,
                "eventContent": this.eventContent,
                "startTime": startTime,
                "endTime": endTime
            }

            createNewEvent(eventData)
        }
    }
})

function createNewEvent(eventData) {
    const data = JSON.stringify(eventData);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            alert(JSON.parse(this.responseText.result));
        }
    });

    xhr.open("POST", "/manager/createEvent");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}