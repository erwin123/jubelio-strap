import { observable, action, decorate, computed } from 'mobx'
import { toJS } from 'mobx';
// class ProductStore {
//     @observable Products = [];

//     @action addProduct = (product) => {
//         this.Products = [[],...this.Products, product];
//         console.log(this.Products);
//     }
// }

export default class ProductStore {
    Products = [];
    Counts = 12;
    constructor() {
        console.log("called store")
    }
    addProduct = (product) => {
        //this.Products.push(product);
        this.Products = Object.assign([], this.Products, this.Products.concat(product));
    }
    clearProduct = () => {
        this.Products = [];
        console.log("product clear");
    }
    removeProduct = (productNo) => {
        let filteredArray = toJS(this.Products).filter(item => item.ProductNo !== productNo);
        this.Products = Object.assign([],filteredArray);
    }
    updateCounts = (adj) => {
        this.Counts = adj + this.Counts
    }
}

decorate(ProductStore, {
    Products: observable,
    Counts: observable,
    addProduct: action,
    clearProduct: action,
    removeProduct: action,
    updateCounts: action
});
