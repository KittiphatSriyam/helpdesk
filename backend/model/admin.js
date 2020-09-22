const { ClientPG } = require('../connection/pg-client')

class AdminModel {
  async adminLogin({ email, password }) {
    let { rows, rowCount } = await ClientPG.query(`SELECT * FROM member
    INNER JOIN official
    ON member.id = official.member_id
    WHERE member.email = $1 AND member.password = $2`, [email, password])

    return rowCount > 0 ? { data: rows[0], status: 200 } : { status: 500 }
  }

}

module.exports = {
  AdminModel
}

