const queryString = window.location.search;
const companySymbol = queryString.split("?symbol=").pop();
const companyURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companySymbol}`;
const container = document.getElementById("container");
const graphsURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${companySymbol}?serietype=line`;
const graphsCanvas = document.getElementById("myChart");
const loading = document.getElementById("loading");
loading.style.display = "none";

function companyData() {
  fetch(companyURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const singleResult = data[`profile`];
      const singleResultName = singleResult[`companyName`];
      const resultInitials = data[`symbol`];
      const hrefAddress = singleResult[`website`];
      const logo = singleResult["image"];
      const description = singleResult["description"];
      const price = singleResult["price"];
      const changesPercentage = singleResult["changesPercentage"];

      const compLogo = `<img src="${logo}"></img>`;
      const companyTitle = `<h1>${singleResultName} (${resultInitials})</h1>`;
      const website = `<a href="${hrefAddress}">Official Website</a>`;
      const compDescription = `<p id="description">${description}</p>`;
      const stockPrice = `<div>Current Stock Price:<strong>${price}</strong>USD</div>`;
      let stockChange;

      if (parseFloat(changesPercentage) < 0) {
        stockChange = `<span>Change: <span class="text-danger"><strong>${changesPercentage}%</strong></span></span>`;
      } else if (parseFloat(changesPercentage) > 0) {
        stockChange = `<span>Change: <span class="text-success"><strong>${changesPercentage}%</strong></span></span>`;
      } else {
        stockChange = `<span>Change: <span class="text-regular"><strong>${changesPercentage}%</strong></span></span>`;
      }

      container.innerHTML = compLogo;
      container.innerHTML += companyTitle;
      container.innerHTML += website;
      container.innerHTML += compDescription;
      container.innerHTML += stockPrice;
      container.innerHTML += stockChange;
    });
}

let xAxis = [];
let yAxis = [];

function getChartData() {
  loading.style.display = "block";
  fetch(graphsURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const historical = data["historical"];
      for (let i = 90; i >= 0; i--) {
        let currentItem = historical[i];
        xAxis.push(currentItem["date"]);
        yAxis.push(currentItem["close"]);
      }
      loading.style.display = "none";
      myChart();
    });
}

function myChart() {
  const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: xAxis,
      datasets: [
        {
          label: "Stock Price Changes",
          data: yAxis,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
companyData();
getChartData();
