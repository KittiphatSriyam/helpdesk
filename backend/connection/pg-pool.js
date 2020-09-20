const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123456789',
})

class PoolPG extends Pool {
  constructor() {
    super()
    this.connect()
  }
  connect() {
    pool
      .connect()
      .then(() => {
        console.log('connected')
      })
      .catch(err => console.error('connection error', err.stack))
  }
  query(...param) {
    return new Promise((resolve, reject) => {
      pool.query(...param)
        .then(result => {
          resolve(result)
        })
        .catch(e => {
          console.error('error stack' + e.stack)
          resolve(e.stack)
        })
      // .finally(() => {
      //   pool.end()
      // })

    })
  }
}

module.exports = {
  PoolPG: new PoolPG()
}
