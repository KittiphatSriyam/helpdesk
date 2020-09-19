const { ClientPG } = require('../connection/pg-client')

class MemberModel {
  async register({ age, dept, email, name, surname, pass }) {

    let { rowCount } = await ClientPG.query('INSERT INTO public.member (email,password,name,surname,age,department_id) values($1,$2,$3,$4,$5,$6)',
      [email, pass, name, surname, age, dept])

    return rowCount > 0 ? 200 : 500
  }

}

module.exports = {
  MemberModel
}

