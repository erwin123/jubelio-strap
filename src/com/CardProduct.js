import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

class CardProduct extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { product } = this.props;
        return (
            <Link to={`/detailsmobx/${product.ProductNo}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                <Card style={{ margin: '13px' }}>
                    <Card.Img variant="top" src={product.ProductImg}/>
                    <Card.Body>
                        <Card.Title dangerouslySetInnerHTML={{ __html: product.ProductName.slice(0,30) }}>
                        </Card.Title>
                        <Card.Text dangerouslySetInnerHTML={{ __html: product.Description.slice(0,100) }}>
                        </Card.Text>
                        <Button variant="primary">View</Button>
                    </Card.Body>
                </Card>
            </Link>
        )
    }
}

export default CardProduct;