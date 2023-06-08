document.getElementById("orderDetailShipping").addEventListener("click", () => {
    document.getElementById("orderShippingBack").style.display="block";
    document.getElementById("orderShippingContent").style.display="block";
})

document.getElementById("orderShippingBack").addEventListener("click", () => {
    document.getElementById("orderShippingBack").style.display="none";
    document.getElementById("orderShippingContent").style.display="none";
})