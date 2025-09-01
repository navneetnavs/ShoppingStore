import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Select, Spin, Input, Button } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import ProductCard from "../components/ProductCard";
import ImageCarousel from "../components/ImageCarousel";

const { Search } = Input;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setLoading(true);
    axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = products;
    
    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter(p => p.category === category);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort products
    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setFilteredProducts(filtered);
  }, [products, category, searchTerm, sortBy]);

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "jewelery", label: "Jewelry" },
    { value: "men's clothing", label: "Men's Clothing" },
    { value: "women's clothing", label: "Women's Clothing" },
  ];

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name", label: "Name: A to Z" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Carousel */}
      <ImageCarousel />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Discover Amazing Products</h1>
          <p className="text-gray-600 text-lg">Find the perfect items for your lifestyle</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <Search
                  placeholder="Search products..."
                  allowClear
                  size="large"
                  prefix={<SearchOutlined className="text-gray-400" />}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-lg"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <FilterOutlined className="text-gray-500" />
                <Select
                  value={category}
                  onChange={setCategory}
                  size="large"
                  style={{ minWidth: 180 }}
                  options={categoryOptions}
                  className="rounded-lg"
                />
              </div>
            </div>
            
            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium whitespace-nowrap">Sort by:</span>
              <Select
                value={sortBy}
                onChange={setSortBy}
                size="large"
                style={{ minWidth: 160 }}
                options={sortOptions}
                className="rounded-lg"
              />
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-emerald-600">{filteredProducts.length}</span> products
              {category !== "all" && (
                <span> in <span className="font-semibold">{categoryOptions.find(c => c.value === category)?.label}</span></span>
              )}
              {searchTerm && (
                <span> matching <span className="font-semibold">"{searchTerm}"</span></span>
              )}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <SearchOutlined style={{ fontSize: '4rem' }} />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            <Button 
              type="primary" 
              className="mt-4 bg-emerald-500 hover:bg-emerald-600 border-emerald-500 hover:border-emerald-600"
              onClick={() => {
                setCategory("all");
                setSearchTerm("");
                setSortBy("default");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {filteredProducts.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
