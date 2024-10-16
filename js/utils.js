document.getElementById("SwitchCompareCba").addEventListener("change", function () {
    if (this.checked) {
        document.querySelector(".card-compare-table-body").style.display = "block";
        let cardHeader = document.querySelector(".card-compare-header");
        cardHeader.style.borderBottomLeftRadius = "0";
        cardHeader.style.borderBottomRightRadius = "0";
    } else {
        document.querySelector(".card-compare-table-body").style.display = "none";
        document.querySelector(".card-compare-header").style.borderRadius = "1rem";
    }
});
