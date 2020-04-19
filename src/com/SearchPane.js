import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, FormControl } from 'react-bootstrap';
import "./SearchPane.css";
import { Link } from "react-router-dom";
import JsonServices from '../services/JsonServices';
import { addProduct } from "../js/action/index";
const mapStateToProps = state => {
    return { products: state.Products };
};

const mapDispatchToProps = dispatch => {
    return {
        addProduct: products => dispatch(addProduct(products))
    };
}

const ProductList = ({ products, addProduct }) => {
    const [stateProduct, setStateProduct] = useState(products);
    const [keyword, setKeyword] = useState("");
    const getData = () => {
        let services = new JsonServices();
        services.getJson("product.json").then(res => {
            addProduct(res.data);
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

    return (
        <Form inline>
            <FormControl value={keyword} type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => { handleFilter(e) }} />
            <ul style={{ padding: "0", margin: "0", listStyleType: "none", position: "absolute", background: "#fff", top: "80%", width: '100%', maxWidth: "350px", zIndex: 99 }}>
                {stateProduct.map(el => (
                    <li key={el.Code} className={"search-list"} onClick={(e) => { handleClick(e) }}>
                        <Link to={`/detailsmobx/${el.ProductNo}`} style={{ color: "inherit", textDecoration: "inherit" }}><div style={{ padding: "5px" }}>{el.ProductName}</div></Link>
                    </li>
                ))}
            </ul>
        </Form>
    )
};

const SearchPane = connect(mapStateToProps, mapDispatchToProps)(ProductList);

export default SearchPane;