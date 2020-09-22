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

  async getProfileaAdminByToken({ token }) {
    let result = { profile: '', status: 200 }
    jwt.verify(token, 'helpdesk', (err, decode) => {
      if (err != null && err != undefined && err != '') {
        result.status = 500
        result = { ...result, ...err }
      } else {
        result.profile = decode
        result.status = 200
      }
    });
    return result
  }
}

const adminController = new AdminController()
module.exports = {
  adminLogin: adminController.adminLogin,
  getProfileaAdminByToken: adminController.getProfileaAdminByToken
}

