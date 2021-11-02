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
            const singleResult = data[`profile`];
            const logo = singleResult["image"];
            const logoOutput = `<img src="${logo}">`;
            const percentageOutput = singleResult["changesPercentage"];
            const element = `<li class="searchResultItem h5 fw-normal">${logoOutput}<a href="./company.html?symbol=${resultInitials}">${fullSentence}</a><span id="toColor">${percentageOutput}</span></li>`;
            searchOutput.innerHTML += element;
            const toColor = document.getElementById("toColor");
            colorPerc(percentageOutput, toColor);
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
