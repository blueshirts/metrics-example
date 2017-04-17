'use strict'
const chai = require('chai')
const should = chai.should()

const Influx = require('influx')

//influx.writePoints([
    //{
      //measurement: 'response_times',
      //tags: { host: os.hostname() },
      //fields: { duration, path: req.path },
      //}
    //]).then(() => {
  //return influx.query(`
    //select * from response_times
    //where host = ${Influx.escape.stringLit(os.hostname())}
    //order by time desc
    //limit 10
    //`)
  //}).then(rows => {
      //rows.forEach(row => console.log(`A request to ${row.path} took ${row.duration}ms`))
      //})

const DATABASE_NAME = 'testdb'


describe('influx-tests', function() {
  before(function() {
    let client = new Influx.InfluxDB({host: 'influxdb'})
    return client.getDatabaseNames().then( names => {
      should.exist(names)
      Array.isArray(names).should.be.true
      return Promise.resolve().then(function() {
        if (names.includes(DATABASE_NAME)) {
          return client.dropDatabase(DATABASE_NAME)
        }
        else {
          return Promise.resolve()
        }
      }).then(function() {
        // Create the database.
        return client.createDatabase(DATABASE_NAME)
      })
    })
  })

  describe('#InfluxDB()', function() {
    it('should successfully ping the database', function() {
      const influx = new Influx.InfluxDB({
          host: 'influxdb',
          database: DATABASE_NAME
      })
      should.exist(influx)

      return influx.ping(1000).then( hosts => {
        should.exist(hosts)
        Array.isArray(hosts).should.be.true
        hosts.length.should.be.greaterThan(0)
        for (let host in hosts) {
          let stats = hosts[host]
          should.exist(stats)
          should.exist(stats.online)
          stats.online.should.be.true
        }
      })
            //host: 'localhost',
            //database: 'express_response_db',
            //schema: [
              //{
                //measurement: 'response_times',
                //fields: {
                  //path: Influx.FieldType.STRING,
                  //duration: Influx.FieldType.INTEGER
                  //},
                //tags: [
                  //'host'
                  //]
                //}
              //]
            //})
    })
  })
})
