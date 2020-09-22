const { RepairModel } = require('../model/repair')
const { getProfileaAdminByToken } = require("../controller/admin")
const model = new RepairModel()

class RepairController {
  async addProblem(param) {
    const resutl = await model.addProblem(param)
    return resutl
  }
  async getProblemLimitedDone(param) {
    const resutl = await model.getProblemLimitedDone(param)
    return resutl
  }
  async getProblemLimitedPending(param) {
    const resutl = await model.getProblemLimitedPending(param)
    return resutl
  }
  async setStatusJob(param) {
    const resutl = await model.setStatusJob(param)
    return resutl
  }
  async updateProblem(param) {
    const profile = await getProfileaAdminByToken(param)
    const resutl = await model.updateProblem({ ...param, profile })
    return resutl
  }

}

const repairController = new RepairController()
module.exports = {
  addProblem: repairController.addProblem,
  getProblemLimitedDone: repairController.getProblemLimitedDone,
  getProblemLimitedPending: repairController.getProblemLimitedPending,
  setStatusJob: repairController.setStatusJob,
  updateProblem: repairController.updateProblem,
}

