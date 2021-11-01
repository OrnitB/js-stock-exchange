const searchField = document.getElementById("searchField");
const searchButton = document.getElementById("searchButton");
const searchOutput = document.getElementById("searchOutput");
const loading = document.getElementById("loading");
loading.style.display = "none";
searchButton.addEventListener("click", tenSearchResults);

function tenSearchResults() {
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
        const element = `<li class="searchResultItem h5 fw-normal"><a href="./company.html?symbol=${singleResultName}">${fullSentence}</a></li>`;
        searchOutput.innerHTML += element;
        loading.style.display = "none";
      }
    });
}
