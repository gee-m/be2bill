var assert = require("chai").assert
var be2bill = require('../lib/be2bill')({ identifier: 'xxx', password: 'xxx', debug: true })
var codes = require('../lib/codes.json')


describe('be2bill', function(){

  before(function(done){
    done()
  })

  beforeEach(function(done){
    done()
  })

  var payment, authorization, alias

  it('authorization', function(done){
    this.timeout(5000)

    be2bill.authorization({ 
      amount: 400, 
      cardcode: '4111111111111111',
      cardcvv: '123',
      cardvaliditydate: '12-18',
      cardfullname: 'John Smith',
      createalias: true
    }, function(err, res, body){
      assert.equal(body.EXECCODE, '0000')
      authorization = body.TRANSACTIONID
      done()
    })

  })

  it('payment', function(done){
    this.timeout(5000)

    be2bill.payment({ 
      amount: 400, 
      cardcode: '4111111111111111',
      cardcvv: '123',
      cardvaliditydate: '12-18',
      cardfullname: 'John Smith',
      createalias: true
    }, function(err, res, body){
      assert.equal(body.EXECCODE, '0000')
      alias = body.ALIAS
      payment = body.TRANSACTIONID
      done()
    })

  })

  it('payment with alias', function(done){
    this.timeout(5000)

    be2bill.payment({ 
      amount: 400, 
      alias: alias,
      aliasmode: 'oneclick'
    }, function(err, res, body){
      assert.equal(body.EXECCODE, '0000')
      done()
    })

  })

  it('refund', function(done){
    this.timeout(5000)

    be2bill.refund({ 
      transactionid: payment
    }, function(err, res, body){
      assert.equal(body.EXECCODE, '0000')
      done()
    })

  })

  it('credit', function(done){
    this.timeout(5000)

    be2bill.credit({ 
      amount: 400,
      alias: alias,
      aliasmode: 'oneclick'
    }, function(err, res, body){
      assert.equal(body.EXECCODE, '0000')
      done()
    })

  })

  it('capture', function(done){
    this.timeout(5000)

    be2bill.capture({ 
      transactionid: authorization
    }, function(err, res, body){
      assert.equal(body.EXECCODE, '0000')
      done()
    })

  })

})
