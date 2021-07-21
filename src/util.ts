import Big from "big.js";

const factorial = (n: number) => {
  let total = Big(1);
  for (let i = 0; i < n; i++) {
    total = total.times(n - i);
  }
  return total;
};

const calcRightDenominator = (m: number, u: number) => {
  let res = Big(0);
  for (let k = 0; k <= m - 1; k++) {
    res = res.add(Big(u).pow(k).div(factorial(k)));
  }
  return res;
};

const calc = (m: number, u: number) => {
  const p = u / m;
  /** 分子 */
  const molecular = Big(u).pow(m).div(factorial(m));
  /** 分母 */
  const denominator = molecular.add(calcRightDenominator(m, u)).times(1 - p);
  const result = molecular.div(denominator);
  console.log("u ** m / m!", molecular);
  console.log("u ** m / m! + (1 - p) * ∈(m-1, k=0)u ** k / k!", denominator);
  console.log("result", result);
  return result;
};

export { calc };
