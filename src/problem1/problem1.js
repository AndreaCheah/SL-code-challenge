/*
Assumptions:
1) Since the task instructions specify that n is any integer, I will assume that n is not of other types
   such as float, string, etc.
2) I will also assume that there won't be unexpected errors such as network errors or runtime errors.
*/

// recursive solution
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

/*
This is my attempt at being "creative" by using tail-recursion instead of the normal recursion,
and it is not my intention to complicate things.
I gained inspiration from the following Stackoverflow post:
https://stackoverflow.com/questions/33923/what-is-tail-recursion.
Tail-recursion optimises memory usage by calculating the result only once, unlike normal recursion.
*/
// tail-recursive solution
var sum_to_n_b = function (n) {
  if (n < 1) {
    console.error("n must be a positive integer");
    return;
  }
  return sum_to_n_b_helper(n);
};

var sum_to_n_b_helper = function (n, sum = 0) {
  if (n === 0) {
    return sum;
  }
  return sum_to_n_b_helper(n - 1, sum + n);
};

// solution using formula
var sum_to_n_c = function (n) {
  if (n < 1) {
    console.error("n must be a positive integer");
    return;
  }
  return (n * (n + 1)) / 2;
};

// test cases
console.log("Testing sum_to_n_a:");
console.log(sum_to_n_a(5)); // Expected output: 15
console.log(sum_to_n_a(1)); // Expected output: 1
console.log(sum_to_n_a(-1)); // Expected error message

console.log("\nTesting sum_to_n_b:");
console.log(sum_to_n_b(5)); // Expected output: 15
console.log(sum_to_n_b(1)); // Expected output: 1
console.log(sum_to_n_b(-1)); // Expected error message

console.log("\nTesting sum_to_n_c:");
console.log(sum_to_n_c(5)); // Expected output: 15
console.log(sum_to_n_c(1)); // Expected output: 1
console.log(sum_to_n_c(-1)); // Expected error message
