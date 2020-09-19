const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123456789',
})

class ClientPG extends Client {
  constructor() {
    super()
    this.connect()
  }
  connect() {
    client
      .connect()
      .then(() => {
        ClientPG.isConnect = true
        console.log('connected')
      })
      .catch(err => console.error('connection error', err.stack))
  }
  query(...param) {
    return new Promise((resolve, reject) => {
      client.query(...param)
        .then(result => {
          resolve(result)
        })
        .catch(e => {
          console.error('error stack' + e.stack)
          reject(e.stack)
        })
      // .finally(() => {
      //   client.end()
      // })
    })
  }
}

module.exports = {
  ClientPG: new ClientPG()
}
