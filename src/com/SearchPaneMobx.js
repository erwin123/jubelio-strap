import React, { useState } from "react";
import { Form, FormControl, Button } from 'react-bootstrap';
import "./SearchPane.css";
import { Link } from "react-router-dom";
import JsonServices from '../services/JsonServices';
import ProductServices from '../services/ProductServices';
import { observer, inject } from "mobx-react";
import { toJS } from 'mobx';

const ProductList =
    (props) => {
        let products = toJS(props.productStore.Products);

        const [stateProduct, setStateProduct] = useState(products);
        const [keyword, setKeyword] = useState("");
        const getData = () => {
            // let services = new JsonServices();
            // services.getJson("product.json").then(res => {
            //     props.productStore.addProduct(res.data);
            // }).catch(error => { console.log(error) });
            let productService = new ProductServices();
            productService.get().then(res => {
                props.productStore.addProduct(res.data);

            }).catch(error => { console.log(error) });
        }


        const handleFilter = (e) => {
            if (products.length == 0)
                getData();//isi lagi state nya
            const { name, value } = e.target;
            setKeyword(value);
            if (value === "")
                setStateProduct([]);
            else
                setStateProduct(products.filter(f => f.ProductName.toLowerCase().indexOf(value) != -1));
        }

        const handleClick = (e) => {
            e.preventDefault();
            setStateProduct([]);
            setKeyword("");
        }

        if (!stateProduct) {
            return (
                <Form inline>
                    <FormControl value={keyword} type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => { handleFilter(e) }} />
                </Form>
            )
        }

        return (
            <Form inline>
                <FormControl value={keyword} type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => { handleFilter(e) }} />
                <ul style={{ padding: "0", margin: "0", listStyleType: "none", position: "absolute", background: "#fff", top: "80%", width: '100%', maxWidth: "350px", zIndex: 99 }}>
                    {stateProduct.slice(0, 5).map(el => (
                        <li key={el.ProductNo} className={"search-list"} onClick={(e) => { handleClick(e) }}>
                            <Link to={`/detailsmobx/${el.ProductNo}`} style={{ color: "inherit", textDecoration: "inherit" }}><div style={{ padding: "5px" }}>{el.ProductName}</div></Link>
                        </li>
                    ))}
                </ul>
            </Form>
        )
    }


export default inject('productStore')(observer(ProductList));