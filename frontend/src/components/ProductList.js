import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const toggleDescription = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const productDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="container mt-5">
      {/* add product button */}
      <Link to="/add" className="button is-success">
        Add New Product
      </Link>

      {/* input search */}
      <div className="mt-3">
        <h1 className="is-size-4 has-text-weight-bold ">Search Product</h1>
        <p>Enter the product name to search:</p>
        <input
          type="text"
          className="input mb-3 mt-2 has-background-white has-text-black"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* product list */}
      <div className="mt-3">
        <h1 className="is-size-4 has-text-weight-bold ">Product List</h1>
        <p>Here is a list of available products:</p>
      </div>
      {/* fetching data */}
      <div className="columns is-multiline mt-2">
        {filteredProducts.map((product) => (
          <div className="column is-one-quarter" key={product.id}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={product.url} alt="Image" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{product.name}</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="is-4">
                      {expanded[product.id]
                        ? product.description
                        : product.description?.substring(0, 40) ||
                          "No description available"}

                      {product.description &&
                        product.description.length > 40 && (
                          <span
                            onClick={() => toggleDescription(product.id)}
                            style={{ color: "blue", cursor: "pointer" }}
                          >
                            {expanded[product.id]
                              ? " Lihat lebih sedikit"
                              : " ...Lihat selengkapnya"}
                          </span>
                        )}
                    </p>
                  </div>
                </div>
              </div>
              <footer className="card-footer">
                <Link to={`/edit/${product.id}`} className="card-footer-item">
                  Edit
                </Link>
                <a
                  href="#"
                  className="card-footer-item"
                  onClick={() => productDelete(product.id)}
                >
                  Delete
                </a>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
