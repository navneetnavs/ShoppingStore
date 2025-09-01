import { useEffect, useState } from "react";
import { Carousel, Spin, Button } from "antd";
import { CaretLeftOutlined, CaretRightOutlined, LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import axios from "axios";

export default function ImageCarousel() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products?limit=8");
        const productImages = response.data.map(product => ({
          id: product.id,
          image: product.image,
          title: product.title,
          price: product.price
        }));
        setImages(productImages);
      } catch (error) {
        console.error("Error fetching product images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductImages();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 py-12">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-16 shadow-lg">
      <div className="container mx-auto px-6">
        <Carousel
          autoplay
          autoplaySpeed={5000}
          dots={true}
          infinite={true}
          slidesToShow={1}
          slidesToScroll={1}
          arrows={true}
          prevArrow={<div className="custom-arrow custom-prev"><LeftCircleFilled /></div>}
          nextArrow={<div className="custom-arrow custom-next"><RightCircleFilled /></div>}
          className="product-slider"
        >
          {images.map((product) => (
            <div key={product.id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[400px]">
                {/* Left side - Product Image */}
                <div className="flex items-center justify-center px-8">
                  <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full">
                    <div className="h-64 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Right side - Product Description */}
                <div className="text-white space-y-6 px-8">
                  <div>
                    <span className="inline-block bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Featured Product
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                      {product.title}
                    </h2>
                    <p className="text-blue-100 text-lg leading-relaxed mb-6">
                      Discover this amazing product from our curated collection. 
                      High quality and exceptional value for your lifestyle.
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-3xl font-bold text-emerald-400">
                      ${product.price}
                    </div>
                    <Button 
                      type="primary"
                      size="large"
                      className="bg-emerald-500 hover:bg-emerald-600 border-emerald-500 hover:border-emerald-600 font-semibold px-8 py-2 h-12"
                    >
                      Shop Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
