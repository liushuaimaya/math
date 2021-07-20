const factorial = (n: number) => {
  let total = 1;
  for (let i = 0; i < n; i++) {
    total *= n - i;
  }
  return total;
};

const calcRightDenominator = (m: number, u: number) => {
  let res = 0;
  for (let k = 0; k <= m - 1; k++) {
    res += u ** k / factorial(k);
  }
  return res;
};

const calc = (m: number, u: number) => {
  const p = u / m;
  /** 分子 */
  const molecular = u ** m / factorial(m);
  /** 分母 */
  const denominator = molecular + (1 - p) * calcRightDenominator(m, u);
  return molecular / denominator;
};

export { calc };
