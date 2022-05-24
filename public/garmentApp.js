var garmentData = {
  init() {
    loadGarments();
  },

  garmentCart: [],
  cartTotal: 0,
  garments: [],
  errorMessage: "",

  garmentFilter: { season: "All", gender: "All", price: 0 },
  newGarment: { description: "", price: 0, season: "", gender: "", img: "" },

  showAddGarment: false,
  showLogin: false,

  showMessage(message) {
    this.errorMessage = message;

    setTimeout(() => {
      this.errorMessage = "";
    }, 3000);
  },

  addGarment() {
    axios
      .post("/api/garments", this.newGarment)
      .then((result) => {
        if (result.data.status == "error") {
          showMessage(result.data.message);
        } else {
          this.garmentFilter.season = "All";
          this.garmentFilter.gender = "All";

          this.newGarment.description = "";
          this.newGarment.season = "";
          this.newGarment.gender = "";
          this.newGarment.img = "";
          this.newGarment.price = 0;

          this.showAddGarment = false;
          this.loadGarments();
        }
      })
      .catch((err) => {
        showMessage(err.stack);
      });
  },

  loadGarments() {
    axios
      .get(
        `/api/garments?gender=${this.garmentFilter.gender}&season=${this.garmentFilter.season}`
      )
      .then((result) => result.data)
      .then((result) => result.garments)
      .then((Data) => {
        this.garments = Data;
      });
  },

  loadGarmentByPrice() {
    axios
      .get(`/api/garments/price/${this.garmentFilter.price}`)
      .then((result) => result.data)
      .then((result) => result.garments)
      .then((Data) => {
        this.garments = Data;
      });
  },

  cartTotalDisplay() {
    return Number(this.cartTotal).toFixed(2);
  },
};

document.addEventListener("alpine:init", () => {
  Alpine.directive("garmentData", garmentData);
});
