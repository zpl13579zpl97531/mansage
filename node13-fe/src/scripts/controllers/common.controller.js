module.exports = {
  menu: () => {
    let hash = location.hash
    let $a = $('#menu li').has('a')
    let target
    switch(hash) {
      case '':
      case '#/':
        target = $a.eq(0)
        break
      default:
        target = $a.eq(1)
        break
    }
    target.addClass('active').siblings().removeClass('active')
  }
}