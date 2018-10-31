const posListTpl = require('../views/position.list.html')
const posSaveTpl = require('../views/position.save.html')
const posUpdateTpl = require('../views/position.update.html')

const posModel = require('../models/position.model')

const handleBtnClick = (router) => {
  router.go('/save')
}

const handleBackBtnClick = (router) => {
  router.go('/position')
}

const handleAddSubmitClick = (router) => {
  let options = {
    "success" : (result, status) => {
      if (result.ret) {
        $("#possave").get(0).reset()
      } else {
        alert('插入失败')
      }
    },
    "resetForm" : true,
    "dataType" : "json"
  };
  $("#possave").ajaxSubmit(options)
  router.go('/position')
}

const handleUpdateSubmitClick = (router) => {
  let options = {
    "success" : (result, status) => {
      if (result.ret) {
        $("#posupdate").get(0).reset()
      } else {
        alert('修改失败')
      }
    },
    "resetForm" : true,
    "dataType" : "json"
  };
  $("#posupdate").ajaxSubmit(options)
  router.go('/position')

}

const handleRemoveBtnClick = async ({id, router}) => {
  const result = await posModel.remove({id, router})
  if (result.ret) {
    router.go('/position/' + id)
  } else {
    alert('删除失败，请与管理员联系.')
  }
}

const handleUpdateBtnClick = ({id, router}) => {
  
}

const list = async (router) => {
  let html = template.render(posListTpl, {
    list: (await(posModel.list())).data
  })

  $('body').off('click', '#addbtn')
  $('body').off('click', '.pos-update')
  $('body').on('click', '#addbtn', handleBtnClick.bind(this, router))
  $('body').on('click', '.pos-update', function(){
    let id = $(this).attr('posid')
    router.go('/update/' + id)
  })

  return html
}

const save = (router) => {
  $('body').off('click', '#posback')
  $('body').off('click', '#possubmit')
  $('body').on('click', '#posback', handleBackBtnClick.bind(this, router))
  $('body').on('click', '#possubmit', handleAddSubmitClick.bind(this, router))
  return posSaveTpl
}

const remove = (router) => {
  $('.pos-remove').off('click').on('click', function(){
    let id = $(this).attr('posid')
    if(confirm("确认删除")){
      handleRemoveBtnClick({router, id})
    }
   
  })
}
const update = async ({router, id}) => {

  $('body').off('click', '#posback')
  $('body').off('click', '#possubmit')
  $('body').on('click', '#posback', handleBackBtnClick.bind(this, router))
  $('body').on('click', '#possubmit', handleUpdateSubmitClick.bind(this, router))

  const pos = (await posModel.listone(id))['data']
  let html = template.render(posUpdateTpl, {
    pos
  })

  return html
}

module.exports = {
  list,
  save,
  remove,
  update
}