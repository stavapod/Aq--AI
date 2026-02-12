const fees = {
  kaspi: {
    transferOut: 0.01,
    transferIn: 0,
    withdrawal: 500,
    interestMonthly: 0.005
  },
  halyk: {
    transferOut: 0.008,
    transferIn: 0,
    withdrawal: 700,
    interestMonthly: 0.006
  }
};

function calculate() {
  let amount = Number(document.getElementById("amount").value);
  let fromBank = document.getElementById("from_bank").value;
  let toBank   = document.getElementById("to_bank").value;
  let speed    = document.getElementById("speed").value;
  let withdrawAfter = document.getElementById("withdraw_after").checked;

  if (!amount || amount <= 0) {
    return (document.getElementById("result").innerText = "Enter a valid positive amount.");
  }

  if (fromBank === toBank) {
    return (document.getElementById("result").innerText = "Select different banks.");
  }

  // base transfer fee
  let baseFee = amount * fees[fromBank].transferOut + amount * fees[toBank].transferIn;

  // instant premium
  let speedFee = (speed === "instant") ? amount * 0.005 : 0;

  // total transfer fees
  let totalFees = baseFee + speedFee;

  // withdrawal
  let withdrawFee = withdrawAfter ? fees[toBank].withdrawal : 0;
  totalFees += withdrawFee;

  // summary
  document.getElementById("result").innerHTML =
    `<h3>Calculation Result</h3>
     Amount: ${amount.toLocaleString()} KZT<br>
     Transfer fee: ${totalFees.toLocaleString()} KZT<br>
     (Includes ${withdrawFee ? `withdrawal: ${withdrawFee} KZT` : "no withdrawal"})`;

}
