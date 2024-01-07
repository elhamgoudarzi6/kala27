const Controller = require(`${config.path.controller}/Controller`);
const request = require('request-promise');
const randomstring = require('randomstring');

module.exports = new class PaymentController extends Controller {
  payment(req, res) {
      console.log(req.body.user.price)
    let params = {
      MerchantID: '6d21d564-572f-4446-a18f-6b2c3362957a',
      Amount: req.body.user.price,
      CallbackURL: 'http://api.kala27.com/api/v1/user/payment/checker?price=' + req.body.user.price + '&',
      Description: 'پرداخت هزینه خرید کالا',
    };
    let options = {
      method: 'POST',
      uri: 'https://www.zarinpal.com/pg/rest/WebGate/PaymentRequest.json',
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
      },
      body: params,
      json: true,
    };
    request(options)
      .then(data => {
        if (data.Status === 100) {
          this.model.Payment({
            userID: req.body.user.userID,
            resNumber: data.Authority,
            price: req.body.user.price,
            statePayment: false,
            date: req.body.user.date,
            time: req.body.user.time,
            mobile: req.body.user.mobile
          }).save(err => {
            if (err) {
              throw err;
            }
            else {
              let countProduct = req.body.product;
              for (var i = 0; i < countProduct.length; i++) {
                let x = countProduct[i];
                this.model.Basket({
                  userID: req.body.user.userID,
                  categoryID: x.categoryID,
                  productID: x.id,
                  infoID: x.infoID,
                  refID: data.Authority,
                  count: x.number,
                  price: x.price,
                  offerPercent: x.discountPercent,
                  sendCost: x.sendCost,
                  date: req.body.user.date,
                  time: req.body.user.time,
                  orderTrackingCode:randomstring.generate({charset: '123456789', length: 8})
                }).save(err => {
                  if (err) {
                    throw err;
                  }
                });
              }
            }
          });
          return res.json({
            data: `https://www.zarinpal.com/pg/StartPay/${data.Authority}`,
            sucess: true
          })
        }
      })
      .catch(err => res.json(err.message));
  }

  checker(req, res, next) {
    try {
      let params = {
        MerchantID: '6d21d564-572f-4446-a18f-6b2c3362957a',
        Amount: req.query.price,
        Authority: req.query.Authority,
      };
      let options = {
        method: 'POST',
        uri: 'https://www.zarinpal.com/pg/rest/WebGate/PaymentVerification.json',
        headers: {
          'cache-control': 'no-cache',
          'content-type': 'application/json'
        },
        body: params,
        json: true,
      };
      request(options)
        .then(data => {
          console.log(data);
          if (data.Status === 100) {
            this.model.Payment.updateOne(
              { resNumber: req.query.Authority },
              { $set: { statusPayment: 'موفق', refID: data.RefID } }).exec((err, result) => {
              });
            this.model.Basket.find({ refID: req.query.Authority }).exec((err, resultBasket) => {
              if (resultBasket.length > 0) {
                console.log(resultBasket);
                this.model.Basket.update(
                  { refID: req.query.Authority },
                  { $set: { success: 'موفق', refID: data.RefID} }).exec((err, result) => {
                  });
                for (let i = 0; i < resultBasket.length; i++) {
                  let x = resultBasket[i]['_doc'].infoID;
                  console.log(x);
                  this.model.Product.findOne({ _id: resultBasket[i]['_doc'].productID }, (err, company) => {
                    if (company) {
                        
                      for (var j = 0; j < company.info.length; j++){
                          console.log(company.info[j]._id);
                        if (company.info[j]._id == x) {
                          company.info[j].remainsNumber = company.info[j].remainsNumber - resultBasket[i]['_doc'].count;
                          company.save();
                        }
                      }
                       
                    }
                  })
                }
                 return res.redirect('http://www.kala27.com/orderFactor/'+  data.RefID);
              }
            });
          } else {
            this.model.Basket.deleteMany({ refID: req.query.Authority }).exec((err, result) => {
              if (result) {
                return res.redirect('http://www.kala27.com/orderFactor/false');
              }
            })
          }
        }).catch(err => {
          next(err)
        });
    } catch (err) {
      next(err)
    }
  }

  sendsmsPaymentTracking = (TransationNum, mobile) => {
    var qs = require("querystring");
    var http = require("http");
    var options = {
      "method": "POST",
      "hostname": "rest.payamak-panel.com",
      "port": null,
      "path": "/api/SendSMS/SendSMS",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "7ce78606-0d0b-107d-286c-bbd4b4142760",
        "content-type": "application/x-www-form-urlencoded"
      }
    };
    var req = http.request(options, function (res) {
      var chunks = [];
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
      res.on("end", function () {
        var body = Buffer.concat(chunks);
      });
    });
    req.write(qs.stringify({
      username: '09211480573',
      password: 'cgbd4h',
      to: mobile,
      from: '5000400010602',
      text: ` کد پیگیری پرداخت شما در آزمون مدارس آموزش پرورش ناحیه یک : ${TransationNum} می باشد `,
      isflash: 'false'
    }));
    req.end();
    return TransationNum;
  }
  displayPayment(req, res) {
    console.log(req.body)
    this.model.Payment.find({ userID: req.body.userID, statusPayment: "موفق" }, (err, result) => {
      if (result.length) {
        return res.json({
          data: result,
          success: true
        })
      }
      res.json({
        data: 'کاربر یافت نشد',
        success: false
      })
    })
  }

  checkStatePayment(req, res) {
    this.model.Payment.findOne({ nationalCode: req.body.nationalCode, statusPayment: 'موفق' }, (err, Payment) => {
      if (err) throw err;
      if (Payment) {
        return res.json({
          data: Payment,
          success: true
        });
      }
      else {
        return res.json({
          data: Payment,
          success: false
        });
      }
    })
  }

  trackingPayment(req, res) {
    this.model.Payment.findOne({ resNumber: req.body.resNumber }, (err, Payment) => {
      if (err) throw err;
      if (Payment) {
        return res.json({
          data: Payment,
          success: true
        });
      }
      res.json({
        data: 'یافت نشد',
        success: false
      })
    })
  }

  updateProductInventory(req, res) {
    this.model.Product.findOne({ _id: req.body.id }, (err, company) => {
      if (err) throw err;
      if (company) {
        for (var i = 0; i < company.info.length; i++)
          if (company.info[i]._id == req.body.infoID) {
            company.info[i].remainsNumber = company.info[i].remainsNumber - 3;
            company.save();
            return res.json({
              data: company.info.length,
              success: false
            });
          }
          else {
            return res.json({
              data: company.info[1]._id,
              success: false
            });
          }
      }
    });
  }


}
