const { ClientPG } = require('../connection/pg-client')

class RepairModel {
  async addProblem({ title, id, detail, }) {

    let { rowCount } = await ClientPG.query(`INSERT INTO public.repair
    (repair_title,repair_detail,repair_create,status,owner_id)
    VALUES
    ($1,$2,$3,$4,$5)
    `, [title, detail, new Date(), 1, id])
    return rowCount > 0 ? 200 : 500
  }

}

module.exports = {
  RepairModel
}

