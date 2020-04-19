import axios from 'axios';
class ProductServices {
    uri = "http://localhost:3001/products";
    uri_synch = "http://localhost:3001/synch_elevenia";
    constructor() {

    }

    get() {
        return axios.get(this.uri, { headers: { 'Content-Type': 'application/json' } });
    }

    put(obj){
        return axios.post(this.uri+"/edit",obj, { headers: { 'Content-Type': 'application/json' } });
    }

    delete(productno){
        return axios.post(this.uri+"/delete/"+productno,{}, { headers: { 'Content-Type': 'application/json' } });
    }

    getByCode(code) {

    }

    synchProduct() {
        return axios.get(this.uri_synch, { headers: { 'Content-Type': 'application/json' } });
    }
}

export default ProductServices;