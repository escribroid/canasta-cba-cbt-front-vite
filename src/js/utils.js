document.getElementById("SwitchCompareCba").addEventListener("change", function () {
    if (this.checked) {
        document.querySelector(".table__compare__body").style.display = "block";
        let cardHeader = document.querySelector(".card__compare__header");
        cardHeader.style.borderBottomLeftRadius = "0";
        cardHeader.style.borderBottomRightRadius = "0";
    } else {
        document.querySelector(".table__compare__body").style.display = "none";
        document.querySelector(".card__compare__header").style.borderRadius = "1rem";
    }
});
