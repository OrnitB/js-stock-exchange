const searchField = document.getElementById("searchField");
const searchButton = document.getElementById("searchButton");
const searchOutput = document.getElementById("searchOutput");
const loading = document.getElementById("loading");
const container = document.getElementById("container");
loading.style.display = "none";
searchButton.addEventListener("click", tenSearchResults);

document.addEventListener("keyup", function (event) {
  if (event.code === "Enter") {
    tenSearchResults();
  }
});

function onClickField() {
  searchField.value = "";
}

function tenSearchResults() {
  searchOutput.innerHTML = "";
  const endPoint = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchField.value}&amp;limit=10&amp;exchange=NASDAQ`;
  loading.style.display = "block";
  fetch(endPoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      searchOutput.innerHTML = "";
      for (let i = 0; i < 10; i++) {
        if (typeof data[i] === "undefined") {
          break;
        }
        let singleResult = data[i];
        let singleResultName = singleResult.name;
        let resultInitials = singleResult.symbol;
        let fullSentence = `${singleResultName} (${resultInitials})`;
        const indexCompanyURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${singleResult.symbol}`;
        fetch(indexCompanyURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            let singleResult = data[`profile`];
            let logo = singleResult["image"];
            let logoOutput = `<img id="searchLogos" src="${logo}">`;
            let percentageOutput = singleResult["changesPercentage"];
            let element;
            if (percentageOutput < 0) {
              element = `<li class="searchResultItem h5 fw-normal">${logoOutput}<a href="./company.html?symbol=${resultInitials}">${fullSentence}</a><span style="color: red">${percentageOutput}</span></li>`;
            } else if (percentageOutput > 0) {
              element = `<li class="searchResultItem h5 fw-normal">${logoOutput}<a href="./company.html?symbol=${resultInitials}">${fullSentence}</a><span style="color: green">${percentageOutput}</span></li>`;
            } else {
              element = `<li class="searchResultItem h5 fw-normal">${logoOutput}<a href="./company.html?symbol=${resultInitials}">${fullSentence}</a><span style="color: black">${percentageOutput}</span></li>`;
            }
            searchOutput.innerHTML += element;
            loading.style.display = "none";
          });
      }
    });
}

function colorPerc(perc, id) {
  if (perc < 0) {
    id.style.color = "red";
  } else if (perc > 0) {
    id.style.color = "green";
  } else {
    id.style.color = "black";
  }
}

const marqueeText = document.getElementById("marqueeText");

function marqueeGainers() {
  const gainersAPI =
    "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/gainers";
  fetch(gainersAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      marqueeText.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        let ticker = data[i].ticker;
        let price = data[i].price;
        let changesPercentage = data[i].changesPercentage;
        marqueeText.innerHTML += `<span id="gainer">${ticker}  (${price})  <span id="changesPercentage">(${changesPercentage})</span></span>`;
      }
    });
}
marqueeGainers();
