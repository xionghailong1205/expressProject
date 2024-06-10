function getOrganizationList() {
    let data = null

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText))
        }
    };

    xhr.open("GET", "/organization/organizationList");
    xhr.setRequestHeader("Accept", "*/*");

    xhr.send(data);
}