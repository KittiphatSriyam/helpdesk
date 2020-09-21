const { RepairModel } = require('../model/repair')
const model = new RepairModel()

class RepairController {
  async addProblem(param) {
    const resutl = await model.addProblem(param)
    return resutl
  }
  async getAllProblem() {
    const resutl = await model.getAllProblem()
    return resutl
  }
  async getProblemLimited(param) {
    const resutl = await model.getProblemLimited(param)
    return resutl
  }

}

const repairController = new RepairController()
module.exports = {
  addProblem: repairController.addProblem,
  getAllProblem: repairController.getAllProblem,
  getProblemLimited: repairController.getProblemLimited
}

