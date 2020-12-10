
import axios from 'axios';

export default class KhuTroService {

    getProductsSmall() {
        return axios.get('data/products-small.json').then(res => res.data.data);
    }

    getProducts() {
        return axios.get(`https://api.jsonbin.io/b/5fd09850516f9d12702a45c5/2`).then((res) => res.data.khutro);
    }

    getProducts2() {
        return axios.get(`https://api.jsonbin.io/b/5fd095932946d2126f006363`).then((res) => res.data.nhatro);
    }
    getProductsWithOrdersSmall() {
        return axios.get('data/products-orders-small.json').then(res => res.data.data);
    }
    deleteproduct(e){
        return axios.delete(`https://api.jsonbin.io/b/5fd095932946d2126f006363` + e).then((res) => res.data.khutro);
    }
}
    