/**
 * recursive logic
 * @link https://www.youtube.com/watch?v=VrrnjYgDBEk
 */

let steps = 0;
/**
 * determines how many times it takes to get the collatz
 * @param {number} n
 * @returns {number}
 */
function collatz(n: number): number {
  steps++;
  //  base case
  if (n == 1) {
    return 0;
  }

  if (n % 2 == 0) {
    // even number
    // console.log('even' + n);
    return 1 + collatz(n / 2);
  } else {
    //   odd number
    // console.log('odd' + n);

    return 1 + collatz(3 * n + 1);
  }
}

/**
 * to run
 * npm run ts-node collatz.ts
 */
console.log('collatz 1', `steps: ${steps}`, collatz(1));

steps = 0;
console.log('collatz 2', `steps: ${steps}`, collatz(2));
steps = 0;
console.log('collatz 3 ', `steps: ${steps}`, collatz(3));
