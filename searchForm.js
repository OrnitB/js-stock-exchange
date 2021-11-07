const loading = document.getElementById("loading");
loading.style.display = "none";
class searchForm {
  constructor(form, button) {
    this.form = form;
    this.button = button;
    this.form.addEventListener("click", () => this.onClickField());
    this.button.addEventListener("click", () => resultsList.tenSearchResults());
  }

  onClickField() {
    return (this.form.value = "");
  }
}

const searchField = document.getElementById("searchField");
const searchButton = document.getElementById("searchButton");
const searchush = new searchForm(searchField, searchButton);
