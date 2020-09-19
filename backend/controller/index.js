const DepartmentController = require('./department')
const memberController = require('./member')

module.exports = {
  ...DepartmentController,
  ...memberController,
}
