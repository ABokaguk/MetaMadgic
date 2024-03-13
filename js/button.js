document.addEventListener("DOMContentLoaded", function () {
    const tabsBtns = document.querySelectorAll(".tabs_nav button");
    const tabsItem = document.querySelectorAll(".tabs_item");

    function hideTabs() {
        tabsItem.forEach(item => item.style.display = "none");
        tabsBtns.forEach(item => item.classList.remove("active"));
    }

    function showTab(index) {
        tabsItem.forEach(item => item.style.display = "none");
        tabsItem[index].style.display = "block";
        tabsBtns.forEach(item => item.classList.remove("active"));
        tabsBtns[index].classList.add("active");
    }

    hideTabs();
    showTab(0);

    tabsBtns.forEach((btn, index) => btn.addEventListener("click", () => {
        hideTabs();
        showTab(index);
    }));

    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("button")) {
        var buttonToClick = urlParams.get("button");
        buttons.forEach(function(button) {
            if (button.innerText === buttonToClick) {
                button.click();
            }
        });
    }
});
