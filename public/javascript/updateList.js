// TODO: 写一个 mutation
var updateList = new Vue({
    el: '#updateList',
    data: {
        updateList: [

        ],
    },
    mounted() {
        this.initUpdateList();
    },
    methods: {
        initUpdateList() {
            const setData = (dataFromBE) => {
                this.updateList = dataFromBE
            }

            getUpdateList(setData)
        }
    }
})

function getUpdateList(setData) {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const updateList = JSON.parse(this.responseText)
            if (updateList.error) {
                alert(updateList.error)
                location.href = '/'
            }
            setData(updateList)
        }
    });

    xhr.open("GET", "/manager/getUpdateList");
    xhr.setRequestHeader("Accept", "*/*");

    xhr.send(data);
}