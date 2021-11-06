class Marquee {
  constructor(div) {
    this.div = div;
  }
  marqueeGainers() {
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
          marqueeText.innerHTML += `<span id="gainer">${ticker} (${price})  <span id="changesPercentage">(${changesPercentage})</span></span>`;
        }
      });
  }
}
const marqueeText = document.getElementById("marqueeText");
const gainers = new Marquee(marqueeText);
gainers.marqueeGainers();
