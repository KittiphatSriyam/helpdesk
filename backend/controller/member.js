const { MemberModel } = require('../model')

const model = new MemberModel()

class MemberController {
  member(param) {
    const resutl = model.register(param)
    return resutl
  }
}

const memberController = new MemberController()
module.exports = {
  member: memberController.member
}

