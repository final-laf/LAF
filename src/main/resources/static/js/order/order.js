// 모달창 관련
document.getElementById("orderDetailShipping").addEventListener("click", () => {
  document.getElementById("orderShippingBack").style.display="block";
  document.getElementById("orderShippingContent").style.display="block";
  document.body.style.overflowY = "hidden";
})

document.getElementById("orderShippingBack").addEventListener("click", () => {
  document.getElementById("orderShippingBack").style.display="none";
  document.getElementById("orderShippingContent").style.display="none";
  document.body.style.removeProperty('overflow');
})

document.getElementById("orderDetailCoupon").addEventListener("click", () => {
  document.getElementById("orderCouponBack").style.display="block";
  document.getElementById("orderCouponContent").style.display="block";
  document.body.style.overflowY = "hidden";
})

document.getElementById("orderCouponBack").addEventListener("click", () => {
  document.getElementById("orderCouponBack").style.display="none";
  document.getElementById("orderCouponContent").style.display="none";
  document.body.style.removeProperty('overflow');
})
document.getElementById("orderCouponCancel").addEventListener("click", () => {
  document.getElementById("orderCouponBack").style.display="none";
  document.getElementById("orderCouponContent").style.display="none";
  document.body.style.removeProperty('overflow');
})

