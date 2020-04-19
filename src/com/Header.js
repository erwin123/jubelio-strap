import React, { Component } from 'react';
import { Navbar,Nav, Form, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ProductList from './SearchPaneMobx';
class Header extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        const { name, value } = e.target;

    }

    render() {
        const { Title } = this.props;
        return (
            <Navbar bg="light" variant="light" fixed="top">
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="https://jubelio.com/wp-content/uploads/2019/03/LJH.png"
                        height="20"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e)=>{this.handleChange(e)}}/>
                    <ListSearch />
                </Form> */}
                <ProductList />
            </Navbar>
        )
    }
}

export default withRouter(Header);