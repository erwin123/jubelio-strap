import React from "react";
import { Navbar, Form, FormControl } from 'react-bootstrap';
const HomeHeader = (props) => {
    return(
    <Navbar bg="light">
        <Navbar.Brand href="#home">{props.Title}</Navbar.Brand>
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
    </Navbar>
    )
}

export default HomeHeader;