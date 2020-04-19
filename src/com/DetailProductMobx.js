import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import JsonServices from '../services/JsonServices';
import ProductServices from '../services/ProductServices';
import { withRouter } from 'react-router-dom';
import ToastAlert from "./Toaster";
import { observer, inject } from "mobx-react";

const initialProduct = {
    ProductName: "",
    ProductNo: "",
    Description: "",
    ProductImg: "",
    Stock: 0
}

class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Product: {
                ProductName: "",
                ProductNo: "",
                Description: "",
                ProductImg: "",
                Stock: 0
            },
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

    handleEditClick(productNo) {
        this.props.history.push('/editproduct/' + productNo);
    }

    handleClickDelete(e, product) {
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
            <Container style={{ marginBottom: '20px', marginTop: '70px' }}>
                <Row>
                    <Col>
                        <ToastAlert message={alertMessage} title={alertTitle} show={showAlert} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>{Product.ProductName}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={3} lg={3} style={{ overflow: 'hidden' }}>
                        <img src={Product.ProductImg} alt="" style={{ width: '100%' }} />
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                        <div dangerouslySetInnerHTML={{ __html: Product.Description }} style={{ fontSize: '16px' }}></div>
                    </Col>
                    <Col xs={12} md={3} lg={3}>
                        &nbsp;
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                        <h5>Stock : </h5><div dangerouslySetInnerHTML={{ __html: Product.Stock }} style={{ fontSize: '16px' }}></div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" onClick={() => { this.handleEditClick(Product.ProductNo) }}>
                            <i className="fa fa-check"></i>&nbsp;
                        Edit</Button>&nbsp;
                        <Button variant="danger" onClick={(e) => this.handleClickDelete(e, Product)}>
                            <i className="fa fa-trash"></i>&nbsp;
                            Remove
                            </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(inject('productStore')(observer(DetailProduct)));