// Problem 1: Three ways to sum to n

/*
Assumptions:
1) Since the task instructions specify that n is any integer, I will assume that n is not of other types
   such as float, string, etc.
2) I will also assume that there won't be unexpected errors such as network errors or runtime errors.
*/

var sum_to_n_a = function (n) {
  if (n === 1) {
    return 1;
  } else if (n > 1) {
    return n + sum_to_n_a(n - 1);
  } else {
    console.error("n must be a positive integer");
    return;
  }
};

var sum_to_n_b = function (n) {
  if (n < 1) {
    console.error("n must be a positive integer");
    return;
  }
  let total = 0;
  while (n >= 1) {
    total += n;
    n -= 1;
  }
  return total;
};

var sum_to_n_c = function (n) {
  if (n < 1) {
    console.error("n must be a positive integer");
    return;
  }
  return (n * (n + 1)) / 2;
};
