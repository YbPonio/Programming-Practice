app.component("product-display", {
  template:
    /*html*/
    `<div class="item">
    <div class="product">
      <img :src="image" alt="" />
    </div>
    <div class="text">
      <div class="text-info">
        <h1>{{title}}</h1>
        <h3>Shipping: {{shipping}}</h3>

        <p v-if="inStock > 10">In Stock</p>
        <p v-else-if="inStock <= 10 && inStock > 0">
          Stock is almost sold out
        </p>
        <p v-else>Out of Stock</p>

        <ul>
          <li v-for="detail of details">{{detail}}</li>
        </ul>
        

        <div
          class="itemChange"
          v-for="(newDetail, index) of newDetails"
          :key="newDetail.id"
          @click="updateVarient(index)"
          :style="{background: newDetail.color}"
        >
          {{newDetail.law}} {{newDetail.id}}
        </div>
      </div>
      <button
        type="button"
        @click="toAddCart"
        :disabled="!inStock"
        :class="{ isDisableBtn: !inStock }"
      >
        Add to Cart
      </button>
    </div>

    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>`,

  data() {
    return {
      product: "picel",
      brand: "loko",
      selectedVarient: 0,
      details: ["cotton: 100%", "fiber: nuh asdasdsa", "heasdasdhe"],
      newDetails: [
        {
          law: "sds",
          id: 2000,
          color: "#D3BD00",
          quantity: 0,
          image:
            "https://images.unsplash.com/photo-1682695798256-28a674122872?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          law: "okay",
          id: 2001,
          color: "#15D300",
          quantity: 20,
          image:
            "https://images.unsplash.com/photo-1692864339265-a435e1f82d0c?q=80&w=1516&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          law: "okoko",
          id: 2002,
          color: "#00D3BE",
          quantity: 6,
          image:
            "https://images.unsplash.com/photo-1698995475439-f6fa0734e30e?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
      reviews: [],
    };
  },

  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    toAddCart() {
      this.$emit("add-to-cart", this.newDetails[this.selectedVarient].id);
    },
    updateVarient(index) {
      this.selectedVarient = index;
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },

  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.newDetails[this.selectedVarient].image;
    },
    inStock() {
      return this.newDetails[this.selectedVarient].quantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      } else {
        return 2.99;
      }
    },
  },
});
