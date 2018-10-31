import Router from 'sme-router'
const bodyTpl = require('./views/body.html')
const userTpl = require('./views/user.html')

const homeController = require('./controllers/home.controller')
const positionController = require('./controllers/position.controller')
const commonController = require('./controllers/common.controller')

$('.wrapper').html(bodyTpl)
$('#user').html(userTpl)

const router = new Router('router-view')


router.route('/position', async (req, res, next) => {
  res.render(await positionController.list(router))
  commonController.menu()
  positionController.remove(router)
})

router.route('/position/:id', async (req, res, next) => {
  res.render(await positionController.list(router))
  positionController.remove(router)
  positionController.update(router)
})

router.route('/save', (req, res, next) => {
  res.render(positionController.save(router))
  commonController.menu()
})

router.route('/update/:id', async (req, res, next) => {
  const id = req.params.id
  res.render(await positionController.update({router, id}))
})

router.route('*', (req, res, next) => {
  res.render(homeController.render())
  commonController.menu()
})
