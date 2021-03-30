export default () => {
  function addCopy(e) {
    let copyTxt
    e.preventDefault(); // 取消默认的复制事件
    copyTxt = window.getSelection().toString()
    copyTxt = `${copyTxt}
    作者：Joel
    原文：${window.location.href}
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`
    const clipboardData = e.clipboardData || window.clipboardData
    clipboardData.setData('text', copyTxt);
  }
  document.addEventListener("cut", e => {
    addCopy(e)
  });
  document.addEventListener("copy", e => {
    addCopy(e)
  });
}
