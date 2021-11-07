class SearchResult {
  constructor(div, searchValue) {
    this.div = div;
  }
  tenSearchResults() {
    this.div.innerHTML = "";
    const endPoint = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchField.value}&amp;limit=10&amp;exchange=NASDAQ`;
    loading.style.display = "block";
    fetch(endPoint)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.div.innerHTML = "";
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
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              let singleResult = data[`profile`];
              let logo = singleResult["image"];
              let logoOutput = `<img id="searchLogos" src="${logo}">`;
              let percentageOutput = singleResult["changesPercentage"];
              let element;
              if (percentageOutput < 0) {
                element = `<li class="searchResultItem h5 fw-normal">${logoOutput}<a href="./company.html?symbol=${resultInitials}">${fullSentence}</a><span style="color: red">${percentageOutput}%</span></li>`;
              } else if (percentageOutput > 0) {
                element = `<li class="searchResultItem h5 fw-normal">${logoOutput}<a href="./company.html?symbol=${resultInitials}">${fullSentence}</a><span style="color: green">${percentageOutput}%</span></li>`;
              } else {
                element = `<li class="searchResultItem h5 fw-normal">${logoOutput}<a href="./company.html?symbol=${resultInitials}">${fullSentence}</a><span style="color: black">${percentageOutput}%</span></li>`;
              }
              this.div.innerHTML += element;
              loading.style.display = "none";
            });
        }
      });
  }
}
const searchOutput = document.getElementById("searchOutput");
const resultsList = new SearchResult(searchOutput);
