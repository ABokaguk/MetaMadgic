var scrollToTopBtn = document.getElementById("scrollToTopBtn");
function checkScroll() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}


window.onscroll = function() {
  checkScroll();
};

scrollToTopBtn.addEventListener("click", scrollToTop);
