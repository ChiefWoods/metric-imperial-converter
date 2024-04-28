function ConvertHandler () {
  const units = {
    gal: {
      name: 'gallons',
      returnUnit: 'L',
    },
    L: {
      name: 'liters',
      returnUnit: 'gal',
    },
    lbs: {
      name: 'pounds',
      returnUnit: 'kg',
    },
    kg: {
      name: 'kilograms',
      returnUnit: 'lbs',
    },
    mi: {
      name: 'miles',
      returnUnit: 'km',
    },
    km: {
      name: 'kilometers',
      returnUnit: 'mi',
    },
  };

  this.getNum = function (input) {
    const numRegex = /^((\d+\.?(?:\d+)?(?:\/\d+\.?(?:\d+)?)?)|)(?=[a-zA-Z]+$)/;

    return input.match(numRegex)
      ? input.match(numRegex)[0] !== ""
        ? eval(input.match(numRegex)[0])
        : 1
      : null;
  };

  this.getUnit = function (input) {
    const unitRegex = /[a-zA-Z]+$/;

    return input.match(unitRegex)
      ? !['l', 'L'].includes(input.match(unitRegex)[0])
        ? Object.keys(units).find(unit => unit === input.match(unitRegex)[0].toLowerCase())
        : 'L'
      : null;
  };

  this.getReturnUnit = function (initUnit) {
    return units[initUnit].returnUnit;
  };

  this.spellOutUnit = function (unit) {
    return units[unit].name;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const returnNum = initUnit === 'gal'
      ? initNum * galToL
      : initUnit === 'L'
        ? initNum / galToL
        : initUnit === 'lbs'
          ? initNum * lbsToKg
          : initUnit === 'kg'
            ? initNum / lbsToKg
            : initUnit === 'mi'
              ? initNum * miToKm
              : initNum / miToKm;

    return Number(returnNum.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
