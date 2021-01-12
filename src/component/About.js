import React from "react";
import { MDBJumbotron,  MDBContainer,  MDBRow, MDBCol,MDBView} from "mdbreact";
import Footer from './Footer';
import Header from './Header/MainHeader'
import './Css/About.css'
const AboutUs = () => {
  return (
    <div>
     <Header/>
    <div className="text-center">
          <MDBJumbotron style={{background: 'linear-gradient(87deg, #FFE9D5 0, #FFE9D5 90%)'}}>
             <h2 className=' font-weight-bold mb-0 pt-md-3 text-center text-dark font-heading'>About Us
             </h2>
             
              
               <blockquote className="blockquote mb-0">
      <p className='text-dark'>
        
        Our cheif want in life is somebody who will make us do what we can.
      </p>
      <footer className="blockquote-footer text-dark">
      Ralph Waldo <cite title="Source Title">Emerson</cite>
      </footer>
    </blockquote>
            
          </MDBJumbotron>
          <MDBContainer className='mt-5 font-body'>
          <MDBContainer>
        <MDBRow>
          <MDBCol lg="6">
            <p className='h4'>Before online forum</p>
            <MDBView waves>
              <img src="./online.jpg" className="img-fluid" alt="" />
            </MDBView>
          </MDBCol>
          <MDBCol lg="6">
          <p className='h4'>After online forum</p>
            <MDBView waves>
              <img src="./group.jpg" className="img-fluid" alt="" />
            </MDBView>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <p className="text-left h5">Online forums can be used for many purposes, such as helping students to review material prior to an assignment or exam, engaging students in discussion of course material before coming to class, and reflecting on material that they have read or worked with outside of class.</p>
          <p className="text-left h5">If they are well-structured, online discussions can be an effective way to bolster student learning outside of class; however, GSIs often find that students’ entries do not reflect strong engagement. What went wrong? What steps can you take to make an online discussion forum a more effective learning tool for your students?</p>
         
         </MDBContainer>
            
            <Footer/>
    </div>
    </div>
  );
}

export default AboutUs;