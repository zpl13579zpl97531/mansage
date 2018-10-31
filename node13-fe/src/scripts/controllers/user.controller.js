const userModel = require('../models/user.model')
const userTpl = require('../views/user.html')

var isSignin = false

const _signup = async () => {
  let data = $('#userform').serialize()
  let result = await userModel.signup(data)
  if (result.ret) {
    console.log(result)
  }
}

const _signin = async () => {
  let data = $('#userform').serialize()
  let result = await userModel.signin(data)
  if (result.ret) {
    $('#userinfo').text('你好，' + result.data.username)
    $('#btn-user').hide()

    $('#userimg').show()
    $('#userform').hide()
    $('#sign-submit').text('退出')

    // localStorage
    localStorage.setItem('token', result.data.token)
    localStorage.setItem('username', result.data.username)
  }
}

const _signout = () => {
  localStorage.removeItem('token')
  location.reload()
}

const render = () => {

  $('#btn-user span').off('click').on('click', function() {
    if ($(this).hasClass('signin')) {
      $('#sign-submit').text('登录')
    } else {
      $('#sign-submit').text('注册')
    }
  })

  $('#sign-submit').off('click').on('click', function() {
    if ($(this).text() === '注册') {
      _signup()
    } else if ($(this).text() === '登录') {
      _signin()
    } else if ($(this).text() === '退出') {
      _signout()
    }
  })

  if (localStorage.getItem('token')) {
    isSignin = true
  }

  if (isSignin) {
    $('#userinfo').text('你好，' + localStorage.getItem('username'))
    $('#btn-user').hide()
    $('#sign-submit').text('退出')

    $('#userimg').show()
    $('#userform').hide()
  } else {
    $('#userimg').hide()
    $('#userform').show()
  }
}

function renderUserTpl(data) {
  let html = template.render(userTpl, data)
  $('#user').html(html)
}

module.exports = {
  render
}