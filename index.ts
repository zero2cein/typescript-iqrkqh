// Import stylesheets
import './style.css';

let changeMap = {};
function calculateNoOfCoins(amount: number, denomination: number) {
  changeMap[denomination] = Math.floor(amount / denomination);
  return amount - denomination * changeMap[denomination];
}

function makeChangeUsingReduce(amount: number, denominations: number[]) {
  const remainder = denominations
    .sort((a, b) => b - a)
    .reduce(calculateNoOfCoins, amount);
  console.log(
    `Requested Amount = ${amount}, Needed Change ${JSON.stringify(
      changeMap
    )}, Remainder left: ${remainder}`
  );
}

function makeChangeUsingFor(amount: number, denominations: number[]) {
  let inputAmount = amount;
  denominations
    .sort((a, b) => b - a)
    .forEach((t) => {
      amount = calculateNoOfCoins(amount, t);
    });
  console.log(
    `Requested Amount = ${inputAmount}, Needed Change ${JSON.stringify(
      changeMap
    )}, Remainder left: ${amount}`
  );
}

function makeChangeRecursive(
  amount: number,
  denominations: number[],
  index: number = 0,
  isArraySorted = false
) {
  // initialization logic
  if (!isArraySorted) {
    // validation logic
    if (!denominations || denominations.length === 0) {
      // no denominations provided.
      return;
    }

    // do this only once
    denominations = denominations.sort((a, b) => b - a);
    isArraySorted = true;
  }

  if (amount < denominations[denominations.length - 1]) {
    // termination logic
    return amount;
  } else {
    // recursive logic
    const remainingAmount = calculateNoOfCoins(amount, denominations[index]);
    if (
      denominations.length > 0 &&
      remainingAmount > denominations[index + 1]
    ) {
      makeChangeRecursive(remainingAmount, denominations.slice(1), 0, true);
    } else {
      console.log('makeChangeRecursive ', changeMap);
      return;
    }
  }
}

/* Tests */
console.log('*********** Reduce Approach ***********');
makeChangeUsingReduce(231, [100, 20, 5]);
changeMap = {};
makeChangeUsingReduce(8231, [100, 20, 5]);
console.log('*********** forEach Approach ***********');
changeMap = {};
makeChangeUsingFor(123, [100, 10, 4]);
console.log('*********** Recursivce Approach ***********');
changeMap = {};
makeChangeRecursive(123, [100, 20, 4]);
