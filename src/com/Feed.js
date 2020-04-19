
import React, { Component, useContext } from 'react';
import { ProductContext } from '../index'
import JsonServices from '../services/JsonServices';
import ProductServices from '../services/ProductServices';
import CardProduct from './CardProduct';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { connect } from "react-redux";
import { addProduct } from "../js/action/index";
import store from '../js/store/index';
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import ToastAlert from "./Toaster";

const mapDispatchToProps = dispatch => {
    return {
        addProduct: product => dispatch(addProduct(product))
    };
}

const Feed = observer(class Feed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProducts: [],
            showAlert: false,
            alertMessage: "",
            alertTitle: "",
            loader: false
        }

        //console.log(myStore);
    }

    getDataProduct() {
        let productService = new ProductServices();
        productService.get().then(res => {
            this.setState({ dataProducts: res.data });
            this.props.productStore.addProduct(res.data);
        }).catch(error => { console.log(error) });
    }
    componentDidMount() {
        //REDUX
        // if (store.getState().Products.length == 0) {
        //     let services = new JsonServices();
        //     services.getJson("product.json").then(res => {
        //         this.setState({ dataProducts: res.data });
        //         this.props.addProduct(res.data);
        //     }).catch(error => { console.log(error) });
        // } else {
        //     this.setState({ dataProducts: store.getState().Products });
        // }

        //MOBX
        if (this.props.productStore.Products.length == 0) {
            console.log("Load from backend");
            this.setState({ alertTitle: "Load data info", alertMessage: "Load from backend", showAlert: true });
            this.getDataProduct();
            // let services = new JsonServices();
            // services.getJson("product.json").then(res => {
            //     this.setState({ dataProducts: res.data });
            //     this.props.productStore.addProduct(res.data);
            // }).catch(error => { console.log(error) });

        } else {
            console.log("Load from state");
            this.setState({ alertTitle: "Load data info", alertMessage: "Load from state", showAlert: true });
            this.setState({ dataProducts: toJS(this.props.productStore.Products) });
        }
    }

    handleSynch() {
        this.setState({ loader:true });
        let productService = new ProductServices();
        productService.synchProduct().then(res => {
            if (res.data) {
                this.getDataProduct();
                this.setState({ alertTitle: "Synch Done", alertMessage: res.data.Message, showAlert: true });
            }
        }).catch(error => { console.log(error) });
    }

    render() {
        const { dataProducts, showAlert, alertMessage, alertTitle, loader } = this.state;
        if (!dataProducts.length) {
            return (
                <Container style={{ marginTop: '70px' }}>
                    <Row className={"justify-content-lg-center"} style={{ textAlign: "center" }}>
                        <Col>
                            <span>Not data result...</span><br /><br />
                            {loader ? <span>Synchronizing Data....Please wait</span> : <span></span>}
                            {loader ? <span></span> : <Button variant="light" style={{ width: "100%", maxWidth: "450px" }} onClick={() => { this.handleSynch() }}>
                                <i className="fa fa-refresh"></i>&nbsp;
                                Synch from ELEVENIA
                                </Button>}
                        </Col>
                    </Row>

                </Container>
            )
        }
        return (
            <Container style={{ marginTop: '70px' }}>
                <Row>
                    <Col>
                        <ToastAlert message={alertMessage} title={alertTitle} show={showAlert} />
                    </Col>
                </Row>
                <Row>
                    {
                        dataProducts.map(m => {
                            return (
                                <Col xs={12} md={3} lg={4} key={m.ProductNo}>
                                    <CardProduct product={m}></CardProduct>
                                </Col>)
                        })
                    }
                </Row>
            </Container>
        )
    }
});
//redux
// const ExportedFeed = connect(
//     null,
//     mapDispatchToProps
// )(Feed);
export default inject('productStore')(observer(Feed));

//export default withRouter(ExportedFeed);