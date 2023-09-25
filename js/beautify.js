
  // 清除localStorage配置项
function clearItem() {
    localStorage.removeItem('blogbg');
    localStorage.removeItem('universe');
    localStorage.removeItem('blur');
    localStorage.removeItem('fpson');
    localStorage.removeItem('transNum');
    localStorage.removeItem('bing');
    localStorage.removeItem('blurRad');
    localStorage.removeItem('font');
    localStorage.removeItem('themeColor');
    localStorage.removeItem('rs');
    localStorage.removeItem('mouse');
  }
  
  
  // 设置字体
  if (localStorage.getItem("font") == undefined) {
    localStorage.setItem("font", "-apple-system");
  }

  setFont(localStorage.getItem("font"));
  function setFont(n) {
    localStorage.setItem("font", n)
    if (n == "default") {
      document.documentElement.style.setProperty('--global-font', '-apple-system');
      document.body.style.fontFamily = "-apple-system, Consolas_1, BlinkMacSystemFont, 'Segoe UI' , 'Helvetica Neue' , Lato, Roboto, 'PingFang SC' , 'Microsoft JhengHei' , 'Microsoft YaHei' , sans-serif";
    }
    else {
      document.documentElement.style.setProperty('--global-font', n);
      document.body.style.fontFamily = "var(--global-font),-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif";
    }
    try { setFontBorder(); } catch (err) { };
  }
  
  // 设置字体选择框边界
  function setFontBorder() {
    var curFont = localStorage.getItem("font");
    var swfId = "swf_" + curFont;
    document.getElementById(swfId).style.border = "2px solid var(--theme-color)";
    Array.prototype.forEach.call(document.getElementsByClassName("swf"), function (ee) {
      if (ee.id != swfId) ee.style.border = "2px solid var(--border-color)";
    });
  }
  
  
  // 设置主题色
  if (localStorage.getItem("themeColor") == undefined) {
    localStorage.setItem("themeColor", "#fe902f");
  }
  setColor(localStorage.getItem("themeColor"));
  function setColor(c) {
    document.getElementById("themeColor").innerText = `:root{--theme-color:` + map.get(c) + ` !important}`;
    localStorage.setItem("themeColor", c);
    // 刷新鼠标颜色
    CURSOR.refresh();
    // 设置一个带有透明度的主题色，用于菜单栏的悬浮颜色
    var theme_color = map.get(c);
    var trans_theme_color = "rgba" + theme_color.substring(3, theme_color.length - 1) + ", 0.7)";
    document.documentElement.style.setProperty("--text-bg-hover", trans_theme_color);
  }
  
  
  
  // 切换自定义颜色
  var defineColor = localStorage.getItem("blogbg") && localStorage.getItem("blogbg").charAt(0) == '#' ? localStorage.getItem("blogbg") : '#F4D88A';
  function changeBgColor() {
    changeBg(document.querySelector("#colors").value);
  }
  
  // 更换背景(自己的代码)
  if (localStorage.getItem("blogbg") != undefined) {
    let curBg = localStorage.getItem("blogbg");
    document.getElementById("defineBg").innerText = `:root{
      --default-bg: ${curBg};
      --darkmode-bg: ${curBg};
      --mobileday-bg: ${curBg};
      --mobilenight-bg: ${curBg};
    }`;
    changeBg(curBg);
  } else {
      // 替换你自己的默认背景
    document.getElementById("defineBg").innerText = `:root{
      --default-bg: url(/assets/top_index.png);
      --darkmode-bg:url(/assets/top_index.png);
      --mobileday-bg: url(/assets/top_index.png);
      --mobilenight-bg: url(/assets/top_index.png);
    }`;
  }
  function changeBg(s) {
    let bg = document.getElementById("web_bg");
    if (s.charAt(0) == "#") {
      bg.style.backgroundColor = s;
      bg.style.backgroundImage = "none";
      defineColor = s;
    } else {
      bg.style.backgroundImage = s
      defineColor = '#F4D88A';
    };
    localStorage.setItem("blogbg", s);
    localStorage.setItem("bing", "false");
    if (document.getElementById("bingSet")) document.getElementById("bingSet").checked = false;
  }
  
  
  // 切换链接对应的背景(加入了链接检验与防抖)
  function getPicture() {
    debounce(getPicture_, 300);
  }
  
  function getPicture_() {
    let bg = document.getElementById("web_bg");
    checkImgExists(document.getElementById("pic-link").value).then(() => {
      // 有效的图片链接
      var link = "url(" + document.getElementById("pic-link").value + ")";
      bg.style.backgroundImage = link;
      localStorage.setItem("blogbg", link);
      localStorage.setItem("bing", "false");
      if (document.getElementById("bingSet")) document.getElementById("bingSet").checked = false;
      // 提示切换成功
      new Vue({
        data: function () {
          this.$notify({
            title: "可以啦🍨",
            message: "切换自定义背景成功！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }).catch(() => {
      // 无效的图片链接，提示无效
      new Vue({
        data: function () {
          this.$notify({
            title: "链接不对🤣",
            message: "请输入有效的图片链接！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "warning",
            duration: 5000
          });
        }
      })
    })
  }
  // 判断图片链接是否可用
  function checkImgExists(imgurl) {
    return new Promise(function (resolve, reject) {
      var ImgObj = new Image();
      ImgObj.src = imgurl;
      ImgObj.onload = function (res) {
        resolve(res);
      }
      ImgObj.onerror = function (err) {
        reject(err);
      }
    })
  }
