'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const { input } = req.query;

    if (!input) {
      return res.json('invalid unit');
    }

    const initUnit = convertHandler.getUnit(input);
    const initNum = convertHandler.getNum(input);

    if (!initUnit && !initNum) {
      return res.json('invalid number and unit');
    } else if (!initUnit) {
      return res.json('invalid unit');
    } else if (!initNum) {
      return res.json('invalid number');
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit),
    });
  });
};
