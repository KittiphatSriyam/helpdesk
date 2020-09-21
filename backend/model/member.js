const { ClientPG } = require('../connection/pg-client')

class MemberModel {
  async register({ age, dept, email, name, surname, pass }) {

    let { rowCount } = await ClientPG.query('INSERT INTO member (email,password,name,surname,age,department_id) values($1,$2,$3,$4,$5,$6)',
      [email, pass, name, surname, age, dept])

    return rowCount > 0 ? 200 : 500
  }
  async login({ email, password }) {

    let { rows, rowCount } = await ClientPG.query(`SELECT * ,
    member.name AS firstName,
    department.name AS deptName FROM member
    INNER JOIN department
    ON member.department_id = department.department_id
    WHERE email=$1 AND password=$2
    `,
      [email, password])

    return rowCount > 0 ? rows : 500
  }

}

module.exports = {
  MemberModel
}

