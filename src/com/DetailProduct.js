import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import JsonServices from '../services/JsonServices';
import { withRouter } from 'react-router-dom';
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
            }
        };
    }

    componentWillReceiveProps(){
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
        let productService = new ProductServices();
        productService.get().then(res => {
            let viewProduct = res.data.find(f => f.ProductNo === this.props.match.params.code);
            this.setState({ Product: viewProduct });

        }).catch(error => { console.log(error) });
    }

    render() {
        const { Product } = this.state;
        if(!Product)
            return (<span>Product Not Found</span>)
        return (
            <Container>
                <Row>
                    <Col>
                    <h2>{Product.Name}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={3} lg={3} style={{overflow:'hidden'}}>
                        <img src="https://res.cloudinary.com/teepublic/image/private/s--WsYksbXB--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_470/c_crop,g_north_west,h_626,w_470,x_0,y_0/g_north_west,u_upload:v1462829024:production:blanks:a59x1cgomgu5lprfjlmi,x_-395,y_-325/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1513438783/production/designs/2185047_2.jpg" alt="" style={{width:'100%'}}/>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                        {Product.Description}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(DetailProduct);