const { RepairModel } = require('../model/repair')
const model = new RepairModel()

class RepairController {
  async addProblem(param) {
    const resutl = await model.addProblem(param)
    return resutl
  }

}

const repairController = new RepairController()
module.exports = {
  addProblem: repairController.addProblem
}

