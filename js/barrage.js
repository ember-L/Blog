// 切换热评
function switchCommentBarrage () {
    let flag = window.localStorage.getItem('commentBarrageDisplay') // undefined || false
    document.getElementById('comment-barrage').style.display = flag === 'false' ? 'block' : 'none'
    // 本地缓存一天，刷新或切换页面时仍 隐藏或显示 热评。
    window.localStorage.setItem('commentBarrageDisplay', flag === 'false' ? 'undefined' : 'false', 86400000)
  }

  if (document.querySelector('#bber-talk')) {
    var swiper = new Swiper('.swiper-container', {
      direction: 'vertical', // 垂直切换选项
      loop: true,
      autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true
    },
    });
  }