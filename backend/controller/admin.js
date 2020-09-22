const jwt = require('jsonwebtoken');

const { AdminModel } = require('../model/admin')
const model = new AdminModel()

class AdminController {
  async adminLogin(param) {
    const official = await model.adminLogin(param)
    if (official.status == 200) {
      const token = jwt.sign(official.data, 'helpdesk', { expiresIn: '1h' });
      return { data: token, status: 200 }
    } else {
      return { status: 500 }
    }
  }
}

const adminController = new AdminController()
module.exports = {
  adminLogin: adminController.adminLogin
}

