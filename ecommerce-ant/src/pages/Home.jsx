import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Select } from "antd";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts =
    category === "all" ? products : products.filter(p => p.category === category);

  return (
    <div className="p-6">
      <div className="mb-4">
        <Select
          defaultValue="all"
          onChange={setCategory}
          style={{ width: 200 }}
          options={[
            { value: "all", label: "All" },
            { value: "electronics", label: "Electronics" },
            { value: "jewelery", label: "Jewelry" },
            { value: "men's clothing", label: "Men's Clothing" },
            { value: "women's clothing", label: "Women's Clothing" },
          ]}
        />
      </div>

      <Row gutter={[16, 16]}>
        {filteredProducts.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
