console.log("代码注入")

document.querySelector(".page_sideBar_logo").addEventListener("click", () => {
    console.log("clicked")
    window.location.href = "/";
})