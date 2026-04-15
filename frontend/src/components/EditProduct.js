import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getProductById = useCallback(async () => {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    setTitle(response.data.name);
    setDescription(response.data.description);
    setFile(response.data.url);
    setPreview(response.data.url);
  }, [id]);

  useEffect(() => {
    getProductById();
  }, [getProductById]);

  const loadImage = (e) => {
    const image = e.target.files[0];
    if (!image) return;
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file instanceof File) {
      formData.append("file", file);
    }
    formData.append("name", title);
    formData.append("description", description);

    try {
      await axios.patch(`http://localhost:5000/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={updateProduct}>
          <div className="field">
            <label className="label">Product Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Product Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Product Description</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Product Image</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    onChange={loadImage}
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {preview ? (
            <figure className="image is-128x128">
              <img src={preview} alt="Preview" />
            </figure>
          ) : (
            <p>No image selected</p>
          )}

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success mt-5">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
