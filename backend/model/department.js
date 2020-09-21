const { ClientPG } = require('../connection/pg-client')

class DepartmentModel {
  async getDepartment() {
    let { rows } = await ClientPG.query('SELECT * FROM department')
    return rows
  }

}

module.exports = {
  DepartmentModel
}

