// Meal Prep Math engine: the meals a week takes, the batches and containers they need, and the cost. Exact integers, half-up on display only. No named constants; every number is the owner's own entry.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _pl(n, one, many) { return n + (n === 1 ? one : many); }
var _PE = "the people must be from 1 to 100 with no decimal places";
var _MD = "the meals a day must be from 1 to 10 with no decimal places";
var _DY = "the days must be from 1 to 60 with no decimal places";
var _ML = "the meals must be from 1 to 100000 with no decimal places";
var _PB = "the portions a batch must be from 1 to 1000 with no decimal places";
var _PK = "the containers a pack must be from 1 to 1000 with no decimal places";
var _NB = "the batches must be from 1 to 100000 with no decimal places";
var _NP = "the packs must be from 1 to 100000 with no decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }

function mealsTruth(people, perDay, days) {
  var p = _i(people, _PE, 3, 1, 100), m = _i(perDay, _MD, 2, 1, 10), d = _i(days, _DY, 2, 1, 60);
  return "The " + _pl(p, " person", " people") + " at " + _pl(m, " meal", " meals") + " a day for " + _pl(d, " day", " days") + " need " + _pl(p * m * d, " meal", " meals") + ".";
}
function batchTruth(meals, per) {
  var n = _i(meals, _ML, 6, 1, 100000), p = _i(per, _PB, 4, 1, 1000);
  var k = Math.floor((n + p - 1) / p), left = k * p - n;
  return "The " + _pl(n, " meal", " meals") + " at " + p + " a batch take " + _pl(k, " batch", " batches") + ", leaving " + _pl(left, " portion", " portions") + " spare.";
}
function boxTruth(meals, per) {
  var n = _i(meals, _ML, 6, 1, 100000), p = _i(per, _PK, 4, 1, 1000);
  var k = Math.floor((n + p - 1) / p), left = k * p - n;
  return "The " + _pl(n, " meal", " meals") + " in packs of " + p + " containers take " + _pl(k, " pack", " packs") + ", leaving " + _pl(left, " container", " containers") + " spare.";
}
function costTruth(batches, bprice, packs, pprice) {
  var b = _i(batches, _NB, 6, 1, 100000), bp = _p(bprice, _PRICE, 5, 2, 1, 1000000), k = _i(packs, _NP, 6, 1, 100000), pp = _p(pprice, _PRICE, 5, 2, 1, 1000000);
  return "The " + _pl(b, " batch", " batches") + " at $" + _money(bp) + " and " + _pl(k, " pack", " packs") + " at $" + _money(pp) + " cost $" + _money(b * bp + k * pp) + ", batches $" + _money(b * bp) + " and packs $" + _money(k * pp) + ".";
}
