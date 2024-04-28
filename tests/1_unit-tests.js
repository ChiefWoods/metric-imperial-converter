const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  test('Reads whole number input', function () {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  test('Reads decimal number input', function () {
    assert.equal(convertHandler.getNum('3.2L'), 3.2);
  });

  test('Reads fractional input', function () {
    assert.equal(convertHandler.getNum('1/2L'), 0.5);
  });

  test('Reads fractional input with a decimal', function () {
    assert.equal(convertHandler.getNum('3.2/1.6L'), 2);
  });

  test('Returns null on double-fraction', function () {
    assert.equal(convertHandler.getNum('3.2/1.6/2L'), null);
  });

  test('Returns 1 on empty numerical input', function () {
    assert.equal(convertHandler.getNum('L'), 1);
  });

  test('Reads each valid input unit', function () {
    assert.equal(convertHandler.getUnit('32L'), 'L');
    assert.equal(convertHandler.getUnit('3.2gal'), 'gal');
    assert.equal(convertHandler.getUnit('1/2mi'), 'mi');
    assert.equal(convertHandler.getUnit('3.2/1.6km'), 'km');
    assert.equal(convertHandler.getUnit('48lbs'), 'lbs');
    assert.equal(convertHandler.getUnit('4.8kg'), 'kg');
  });

  test('Returns null on invalid input unit', function () {
    assert.equal(convertHandler.getUnit('32Ls'), null);
  });

  test('Returns correct return unit', function () {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
  });

  test('Returns correct name of each unit', function () {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
  });

  test('Converts gal to L', function () {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
  });

  test('Converts L to gal', function () {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
  });

  test('Converts mi to km', function () {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
  });

  test('Converts km to mi', function () {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
  });

  test('Converts lbs to kg', function () {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.1);
  });

  test('Converts kg to lbs', function () {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
  });
});