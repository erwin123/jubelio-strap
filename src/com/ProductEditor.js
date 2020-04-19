import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import JsonServices from '../services/JsonServices';
import ProductServices from '../services/ProductServices';
import { withRouter } from 'react-router-dom';
import { observer, inject } from "mobx-react";
import ToastAlert from "./Toaster";

const initialProduct = {
    ProductName: "",
    ProductNo: "",
    Description: "",
    ProductImg: "",
    Stock: 0
}

class ProductEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Product: initialProduct,
            showAlert: false,
            alertMessage: "",
            alertTitle: ""
        };
    }

    componentWillReceiveProps() {
        console.log(this.props.match.params.code);
        let productService = new ProductServices();
        productService.get().then(res => {
            let viewProduct = res.data.find(f => f.ProductNo === this.props.match.params.code);
            this.setState({ Product: viewProduct });

        }).catch(error => { console.log(error) });
    }

    // componentDidUpdate(){
    //     let services = new JsonServices();
    //     services.getJson("product.json").then(res => {
    //         let viewProduct = res.data.find(f=>f.Code === this.props.match.params.code);
    //         this.setState({Product:viewProduct});
    //     }).catch(error => { console.log(error) });
    // }

    componentDidMount() {
        console.log(this.props.match.params.code);
        // let services = new JsonServices();
        // services.getJson("product.json").then(res => {
        //     let viewProduct = res.data.find(f=>f.Code === this.props.match.params.code);
        //     this.setState({Product:viewProduct});
        // }).catch(error => { console.log(error) });
        let productService = new ProductServices();
        productService.get().then(res => {
            let viewProduct = res.data.find(f => f.ProductNo === this.props.match.params.code);
            this.setState({ Product: viewProduct });

        }).catch(error => { console.log(error) });
    }

    handleChangeInput(e) {
        const { name, value } = e.target;
        this.setState(state => (state.Product[name] = value));
    }

    handleClickSave(e, product) {
        e.preventDefault();
        this.setState({ showAlert: false });
        product.Stock = +product.Stock;
        let productService = new ProductServices();
        productService.put(product).then(res => {
            this.props.productStore.clearProduct(); //clear after edit, so they refresh state data
            this.setState({ alertTitle: "Update status", alertMessage: "Success, data updated!", showAlert: true });
        }).catch(error => { console.log(error) });
    }

    handleClickDelete(e,product) {
        e.preventDefault();
        this.setState({ showAlert: false });
        let productService = new ProductServices();
        productService.delete(product.ProductNo).then(res => {
            this.props.productStore.removeProduct(product.ProductNo); //remove from state data
            this.setState({ Product: initialProduct });
            this.setState({ alertTitle: "Product Delete", alertMessage: "Success, data deleted!", showAlert: true });
            setTimeout(() => {
                this.props.history.push('/feeds');
            }, 1500); 
        }).catch(error => { console.log(error) });
    }

    render() {
        const { Product, showAlert, alertMessage, alertTitle } = this.state;
        if (!Product)
            return (<span>Product Not Found</span>)
        return (
            <Container style={{ marginBottom: '20px', marginTop: '80px' }}>

                <Form>
                    <Row>
                        <Col>
                            <ToastAlert message={alertMessage} title={alertTitle} show={showAlert} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="ProductName">
                                <Form.Label>Nama Produk</Form.Label>
                                <Form.Control name="ProductName" onChange={(e) => this.handleChangeInput(e)} value={Product.ProductName} type="text" placeholder="Nama Produk" />
                                <Form.Text className="text-muted">
                                    Isilah dengan unik dan presisi agar memaksimalkan pencarian
                            </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={3} lg={3} style={{ overflow: 'hidden' }}>
                            <img src={Product.ProductImg} alt="" style={{ width: '100%' }} />
                        </Col>
                        <Col xs={12} md={9} lg={9}>
                            <Form.Group controlId="Description">
                                <Form.Label>Deskripsi Produk</Form.Label>
                                <Form.Control name="Description" onChange={(e) => this.handleChangeInput(e)} as="textarea" rows="3" value={Product.Description} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3} lg={3}>
                            &nbsp;
                        </Col>
                        <Col xs={12} md={9} lg={9}>
                            <Form.Group controlId="Stock">
                                <Form.Label>Stok Produk</Form.Label>
                                <Form.Control width={5} name="Stock" onChange={(e) => this.handleChangeInput(e)} value={Product.Stock} type="number" placeholder="Stock Produk" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="primary" onClick={(e) => this.handleClickSave(e, Product)}>
                                <i className="fa fa-check"></i>&nbsp;
                        Edit</Button>&nbsp;
                        <Button variant="danger" onClick={(e) => this.handleClickDelete(e, Product)}>
                                <i className="fa fa-trash"></i>&nbsp;
                            Remove</Button>
                        </Col>
                    </Row>
                </Form>
            </Container >
        )
    }
}

export default withRouter(inject('productStore')(observer(ProductEditor)));