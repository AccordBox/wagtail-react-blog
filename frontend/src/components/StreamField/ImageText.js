import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { sanitize } from 'dompurify';

function ImageText(props) {
  return (
    <Container className="py-4">
      <Row
        className={`align-items-center ${
          props.value.reverse ? "flex-row-reverse" : ""
        }`}
      >
        <Col xs={12} md={5}>
          <div dangerouslySetInnerHTML= {{ __html: `${sanitize(props.value.text)}` }} />
        </Col>
        <Col xs={12} md={7}>
          <img
            className="img-fluid border"
            alt=""
            src={props.value.image.url}
          />
        </Col>
      </Row>
    </Container>
  );
}

export { ImageText };
