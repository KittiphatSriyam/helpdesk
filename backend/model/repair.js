const { ClientPG } = require('../connection/pg-client')

class RepairModel {
  async addProblem({ title, id, detail, }) {

    let { rowCount } = await ClientPG.query(`INSERT INTO repair
    (repair_title,repair_detail,repair_create,status,owner_id)
    VALUES
    ($1,$2,$3,$4,$5)
    `, [title, detail, new Date(), 1, id])
    return rowCount > 0 ? 200 : 500
  }
  async getProblemLimitedDone({ limit, skip }) {

    let { rows, rowCount } = await ClientPG.query(`SELECT repair.*,own.* ,
    status.status_name ,
    official.member_id AS officialID,
    (SELECT COUNT(*) FROM repair  WHERE repair.status=$1) AS countRow
    FROM repair
    INNER JOIN member  own
    ON own.id = repair.owner_id
    INNER JOIN status
    ON status.status_id = repair.status
    LEFT JOIN official
    ON official.official_id = repair.response_id
    WHERE repair.status=$1
    LIMIT $2 OFFSET $3
    `, [3, limit, skip])

    let data = []
    let j = 0
    for (let i in rows) {
      data[i] = {
        id: j + 1,
        title: rows[i].repair_title,
        datail: rows[i].repair_detail,
        create: rows[i].repair_create,
        end: rows[i].repair_end,
        period: rows[i].period,
        status: rows[i].status_name,
        owner: {
          name: rows[i].name,
          surname: rows[i].surname,
        }
      }

      if (rows[i].officialid != null) {
        let result = await ClientPG.query(`SELECT member.* FROM member WHERE member.id = $1`, [rows[i].officialid])
        data[i].official = {
          name: result.rows[0].name,
          surname: result.rows[0].surname
        }
      }
      j++
    }
    return rowCount > 0 ? { data, status: 200, countRow: rows[0].countrow } : { data, status: 500 }
  }
  async getProblemLimitedPending({ skip, limit }) {
    let { rows, rowCount } = await ClientPG.query(`SELECT repair.*,own.* ,
      status.status_name ,
      official.member_id AS officialID,
      (SELECT COUNT(*) FROM repair  WHERE repair.status=$1 OR repair.status=$2) AS countRow
      FROM repair
      INNER JOIN member  own
      ON own.id = repair.owner_id
      INNER JOIN status
      ON status.status_id = repair.status
      LEFT JOIN official
      ON official.official_id = repair.response_id
      WHERE repair.status=$1 OR repair.status=$2
      LIMIT $3 OFFSET $4
    `, [1, 2, limit, skip])

    let data = []
    let j = 0
    for (let i in rows) {
      data[i] = {
        id: j + 1,
        repair_id: rows[i].repair_id,
        title: rows[i].repair_title,
        datail: rows[i].repair_detail,
        create: rows[i].repair_create,
        end: rows[i].repair_end,
        period: rows[i].period,
        status: rows[i].status_name,
        owner: {
          name: rows[i].name,
          surname: rows[i].surname,
        },
      }

      if (rows[i].officialid != null) {
        let result = await ClientPG.query(`SELECT member.* FROM member WHERE member.id = $1`, [rows[i].officialid])
        data[i].official = {
          name: result.rows[0].name,
          surname: result.rows[0].surname
        }
      }
      j++

    }
    return rowCount > 0 ? { data, status: 200, countRow: rows[0].countrow } : { data, status: 500 }
  }
  async setStatusJob({ id, status }) {
    let { rowCount } = await ClientPG.query(`UPDATE repair
    SET repair_end = $1, status = $2
    WHERE repair_id = $3`, [new Date(), status, id])

    return rowCount > 0 ? { status: 200 } : { status: 500 }
  }
}

module.exports = {
  RepairModel,
}

