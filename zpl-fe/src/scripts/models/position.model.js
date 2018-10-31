const list = () => {
  return $.ajax({
    url: '/api/position/list',
    success: (result) => {
      return result
    }
  })
}

const listone = (id) => {
  return $.ajax({
    url: '/api/position/listone',
    data: {
      id
    },
    success: (result) => {
      return result
    }
  })
}

const remove = ({id}) => {
  return $.ajax({
    url: '/api/position/remove',
    type: 'delete',
    data: {
      id
    },
    success: (result) => {
      return result
    }
  })
}

module.exports = {
  list,
  remove,
  listone
}