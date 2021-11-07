import "./contact.css";
import Email from "../../img/email.png";
import GitIcon from "../../img/git.png"
import ContactImage from "../../img/contact.jpg"
import LinkedIcon from "../../img/linked.png"
import Blog from "../../img/blog.jpg"

const Contact = () => {
  return (
    <div className="c">
      <div className="c-bg"></div>
      <div className="c-wrapper">
        <div className="c-left">
          <h1 className="c-title">Let's get connected...</h1>
          <div className="c-info">
            <div className="c-info-item">
              <img className="c-icon" src={Email} alt="" />
              MAIL ME @ hemuhema2000@gmail.com
            </div>
            <div className="c-info-item">
            <a className="myLinks" href="https://github.com/Nhemapriya" target="_blank">
              <img className="c-icon" src={GitIcon} alt="" />
              View my Github activity
            </a>
            </div>
            <div className="c-info-item">
          <a href=" https://www.linkedin.com/in/hemapriya-n-838251199/" target="_blank">
            <img className="c-icon" src={LinkedIcon} alt="" />
            Connect me on LinkedIn
           </a>
            </div>

            <div className="c-info-item">
          <a href="https://priyahemaa.blogspot.com/" target="_blank">
            <img className="c-icon" src={Blog} alt=""/>
            Checkout my blogs 
           </a>
            </div>

          </div>
        </div>
         <div className="c-right">
           <img src={ContactImage}/>
        </div> 
      </div>
    </div>
  );
};

export default Contact;
