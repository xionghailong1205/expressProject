// TODO: 写一个 mutation
var updateList = new Vue({
    el: '#updateList',
    data: {
        updateList: [
            {
                updateContent: "",
                updateAccessibility: "",
                createAt: "",
                creater: ""
            }
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
            setData(JSON.parse(this.responseText))
        }
    });

    xhr.open("GET", "/manager/getUpdateList");
    xhr.setRequestHeader("Accept", "*/*");

    xhr.send(data);
}