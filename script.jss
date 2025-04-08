// List of currency codes
const currencyCodes = [
    "AED", "AFN", "XCD", "ALL", "AMD", "ANG", "AOA", "AQD", "ARS", "AUD", "AZN", "BAM", "BBD", "BDT", "XOF",
    "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "NOK", "BWP", "BYR", "BZD", "CAD", "CDF", "XAF",
    "CHF", "CLP", "CNY", "COP", "CRC", "CUP", "CVE", "CYP", "CZK", "DJF", "DKK", "DOP", "DZD", "ECS", "EEK",
    "EGP", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD",
    "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS",
    "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LVL", "LYD",
    "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MTL", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN",
    "NAD", "XPF", "NGN", "NIO", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR",
    "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SKK", "SLL", "SOS", "SRD", "STD",
    "SVC", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD",
    "UYU", "UZS", "VEF", "VND", "VUV", "YER", "ZAR", "ZMK", "ZWD"
  ];
  
  // Populate currency select dropdowns with currency codes
  let selectInputs = document.querySelectorAll("select");
  selectInputs.forEach((selectInput) => {
    currencyCodes.forEach((currencyCode) => {
      let option = document.createElement("option");
      option.value = currencyCode;
      option.text = currencyCode;
      selectInput.appendChild(option);
    });
  });
  
  // Elements from the DOM
  const calculateButton = document.getElementById("calculate");
  const amountInput = document.getElementById("amount");
  const fromCurrencySelect = document.getElementById("from");
  const toCurrencySelect = document.getElementById("to");
  const outputElement = document.getElementById("output");
  
  // Handle the calculate button click event
  calculateButton.addEventListener("click", () => {
    const amount = amountInput.value;
    const from = fromCurrencySelect.value;
    const to = toCurrencySelect.value;
  
    // Validate the amount input
    if (amount < 1) {
      alert("Invalid amount");
      return;
    }
  
    // Fetch currency conversion rate
    fetch(`https://v6.exchangerate-api.com/v6/814385ebe55498d47ded4e4f/latest/${from}`)
      .then((res) => res.json())
      .then((response) => {
        const conversionRate = response.conversion_rates[to];
        
        // If conversion rate is valid, display the result
        if (conversionRate !== undefined) {
          const result = amount * conversionRate;
          outputElement.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
          outputElement.style.display = "block";
        } else {
          alert("Invalid currency selection");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  });
  
