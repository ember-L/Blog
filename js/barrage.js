function switchCommentBarrage(){let e=window.localStorage.getItem("commentBarrageDisplay");document.getElementById("comment-barrage").style.display="false"===e?"block":"none",window.localStorage.setItem("commentBarrageDisplay","false"===e?"undefined":"false",864e5)}if(document.querySelector("#bber-talk"))var swiper=new Swiper(".swiper-container",{direction:"vertical",loop:!0,autoplay:{delay:3e3,pauseOnMouseEnter:!0}});