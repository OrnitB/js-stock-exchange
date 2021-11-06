class Marquee {
  constructor(div) {
    this.div = div;
  }
  marqueeGainers() {
    fetch(
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/gainers"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.div.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
          this.div.innerHTML += `<span id="gainer">${data[i].ticker} (${data[i].price})  <span id="changesPercentage">(${data[i].changesPercentage})</span></span>`;
        }
      });
  }
}
const marqueeDiv = document.getElementById("marqueeDiv");
const gainers = new Marquee(marqueeDiv);
gainers.marqueeGainers();
