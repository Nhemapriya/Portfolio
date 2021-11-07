import "./productList.css";
import Product from "../product/Product";
import { products } from "../../data";

const ProductList = () => {
  return (
    <div className="pl">
      <div className="pl-texts">
        <h1 className="pl-title"> Projects & Achievements </h1>
        <br/>
      </div>
      <div className="pl-list">
        {products.map((item) => (
          <Product key={item.id} img={item.img} link={item.link} name={item.name} description={item.description} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
