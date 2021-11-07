import "./about.css";
import Me from "../../img/me.jpeg";
import Skill1 from "../../img/skill1.jpeg"
import Skill2 from "../../img/skill2.jpeg"
import Skill3 from "../../img/skill3.JPG"
const About = () => {
  return (
    <div className="a">
      <div className="a-left">
        <div className="a-card bg"></div>
        <div className="a-card">
          <img
            src={Me}
            alt=""
            className="a-img"
          />
        </div>
      </div>
      <div className="a-right">
        <h1 className="a-title"> Skills </h1>
        <div className="a-award">
          <img src={Skill1} alt="" className="a-award-img" />
          <div className="a-award-texts">
            <h4 className="a-award-title"> ML/DL Libraries and algorithms </h4>
            <p className="a-award-desc">
              Tensorflow, Keras, Explanatory algorithms, Clustering and Similarity algorithms, Object detection , GAN and medical imaging
            </p>
          </div>
        </div> 

        <div className="a-award">
          <img src={Skill2} alt="" className="a-award-img" />
          <div className="a-award-texts">
            <h4 className="a-award-title"> Web Development tools </h4>
            <p className="a-award-desc">
            HTML, CSS, Javascript, React JS, Node JS, Express, Angular Basics, Mongo DB - SQL, SEO
            </p>
          </div>
        </div> 

        <div className="a-award">
          <img src={Skill3} alt="" className="a-award-img" />
          <div className="a-award-texts">
            <h4 className="a-award-title"> Programming essentials and Researches </h4>
            <p className="a-award-desc">
            C, Python, JAVA, Networks and DBMS Concepts. Drafting and implementing academic reasearch papers, journals and tech-scientific articles.
            </p>
          </div>
        </div> 
      

      </div>
    </div>
  );
};

export default About;
