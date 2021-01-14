import React from "react";
import { Col } from "react-bootstrap";
import { TagWidget } from "./TagWidget";
import { CategoryWidget } from "./CategoryWidget";

function SideBar(props) {
  return (
    <Col md={4}>
      <CategoryWidget/>
      <TagWidget />
    </Col>
  );
}

export { SideBar };
