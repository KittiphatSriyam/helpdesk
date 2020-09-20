const { MemberModel } = require('../model/member')
const jwt = require('jsonwebtoken');
const model = new MemberModel()

class MemberController {
  addMember(param) {
    const resutl = model.register(param)
    return resutl
  }
  async getMember(param) {
    let member = await model.login(param)
    if (member != 500) {
      const token = jwt.sign(member[0], 'helpdesk', { expiresIn: '1h' });
      member = token
    }
    return member
  }
  getMemberByToken(Token) {
    const decoded = jwt.verify(Token, 'helpdesk');
    return decoded
  }
}

const memberController = new MemberController()
module.exports = {
  addMember: memberController.addMember,
  getMember: memberController.getMember,
  getMemberByToken: memberController.getMemberByToken
}

