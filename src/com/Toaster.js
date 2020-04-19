import React, { useState,useEffect } from "react";
import { Row, Col, Button, Toast } from 'react-bootstrap';

const ToastAlert = (props) => {
    const [show, setShow] = useState(props.show);
    //setShow(props.show);
    // if(show!=props.show){
    //     setShow(props.show);
    //     setTimeout(() => {
    //         setShow(false);
    //     }, 3000);
    // }
    useEffect(() => {
        if (props.show !== show) {
            setShow(props.show);
        }
    }, [props.show]);
    return (
        <Toast style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: "350px",
            zIndex: "99"
        }} onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header style={{ background: "#8bd3f7" }}>
                <strong className="mr-auto">{props.title}</strong>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast>
    );
}

export default ToastAlert;