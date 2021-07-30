import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import logo from '../resources/images/logo.png'
const Footer = () => {
  return (
      <Container>
          <div className="alertbar">
	<div className="container text-center">
		<img src={logo} alt=""  style={{maxWidth: "70px",maxHeight: "70px"}}  /> &nbsp; Never miss a <b>story</b> from us, get weekly updates in your inbox. <a href="#" class="btn subscribe">Get Updates</a>
	</div>
</div>

   
</Container>
    )
}

export default Footer
