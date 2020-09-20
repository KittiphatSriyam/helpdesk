const { DepartmentModel } = require('../model/department')

const model = new DepartmentModel()

class DepartmentController {
  getDepartment() {
    const resutl = model.getDepartment()
    return resutl
  }
}

const departmentController = new DepartmentController()
module.exports = {
  getDepartment: departmentController.getDepartment
}

