import "./product.css";

const Product = ({name,img,link, description }) => {
  return (
    <div className="p">
      <div className="p-browser">
        <div className="p-circle"></div>
        <div className="p-circle"></div>
        <div className="p-circle"></div>
      </div>
      <a href={link} target="_blank" rel="noreferrer">
        <p> {name} </p>
        </a>
        <br/>
        <img src={img} alt="" className="p-img" />
        <p className="p-desc"> {description} </p>
      
    </div>
  );
};

export default Product;
