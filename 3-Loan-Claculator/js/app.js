const loanForm = document.getElementById('loan-form');
loanForm.addEventListener('submit', function(e) {
  // hide results
  document.getElementById('results').style.display = 'none';
  // show loading
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

function calculateResults() {
  
  // Define Variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  
  
   const principal = parseFloat(amount.value);
   const calculatedInterest = parseFloat(interest.value) / 100 /12;
   const calculatedPayments = parseFloat(years.value) * 12;


   // compute monthly payment
   const x = Math.pow(1+calculatedInterest, calculatedPayments);
   const monthly = (principal*x*calculatedInterest)/ (x-1);

   if(isFinite(monthly)) {
     monthlyPayment.value = monthly.toFixed(2);
     totalPayment.value = (monthly *calculatedPayments).toFixed(2);
     totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
     // hide results
    document.getElementById('results').style.display = 'block';
    // show loading
    document.getElementById('loading').style.display = 'none';
   } else {
     showError("Please Check Your numbers");
   }

}

function showError(error) {
  // create Div
  errorDiv = document.createElement('div')
  // add classes
  errorDiv.className = "alert alert-danger";
  // add text node and append to errorDiv
  errorDiv.appendChild(document.createTextNode(error));
  // get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // insert error above heading
  card.insertBefore(errorDiv, heading);

  // hide results
  document.getElementById('results').style.display = 'none';
  // hide loading
  document.getElementById('loading').style.display = 'none';

  // clear error
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}