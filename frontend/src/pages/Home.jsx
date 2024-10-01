import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/UserContext";
import axios from "axios";
import Product from "../components/Product";
import { Link } from "react-router-dom";

const Home = () => {
  const { username, setUsername, setId, id } = useContext(userContext);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [isUpdate, setIsUpdate] = useState(false);
  const [productId, setProductId] = useState(null);
  const [shoreToDelete, setShoreToDelete] = useState(false);
  const [efectAfterUpdate, setEfectAfterUpdate] = useState(false);

  async function getData() {
    const response = await axios.get("/product");
    setProducts([...response.data]);
  }

  async function handleDeleteAll() {
    await axios.delete("/product");
    setProducts([]);
    setShoreToDelete(false);
  }

  async function handleCreateAndUpdate(isCreate) {
    if (isCreate) {
      const response = await axios.post("/product", {
        id,
        title,
        price,
        discount,
        total: price - discount,
        count,
        category,
        products,
      });
      setProducts([response.data, ...products]);
    } else {
      setIsUpdate(false);
      const response = await axios.put("/product/" + productId, {
        title,
        price,
        discount,
        total: price - discount,
        count,
        category,
      });
      setProducts([...response.data]);
      setEfectAfterUpdate(true);
    }
    setTitle("");
    setPrice(0);
    setDiscount(0);
    setTotal(0);
    setCount(0);
    setCategory("");
  }

  async function handleUpdataOne(id) {
    setEfectAfterUpdate(false);
    setIsUpdate(true);
    setProductId(id);

    products.map((product) => {
      if (product._id === id) {
        setTitle(product.title);
        setPrice(product.price);
        setDiscount(product.discount);
        setCount(product.count);
        setCategory(product.category);
      }
    });
  }

  async function handleLogout() {
    await axios.get("/user/logout");
    setUsername(null);
    setId(null);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="crud">
      {shoreToDelete && (
        <div className="delete-box">
          <h2>Are you shore you wont to delete all product</h2>
          <div>
            <button onClick={() => handleDeleteAll()}>yes</button>
            <button className="no" onClick={() => setShoreToDelete(false)}>
              no
            </button>
          </div>
        </div>
      )}
      {username && (
        <div className="user-info">
          <h3>{username}</h3>
          <button onClick={() => handleLogout()}>Logout</button>
        </div>
      )}
      {!username && (
        <div className="user-info">
          <Link to={"/auth"}>
            <button>Login</button>
          </Link>
        </div>
      )}
      <div className="head">
        <h2>crud</h2>
        <p>PRODUCT MANAGENT SYSTEM</p>
      </div>
      <div className="inputs">
        <input
          placeholder="title"
          type="text"
          value={title}
          onChange={(ev) => {
            setTitle(ev.target.value);
          }}
        />
        <div className="price">
          <input
            type="number"
            placeholder="price"
            value={price}
            onChange={(ev) => {
              setPrice(ev.target.value);
            }}
          />
          <input
            type="number"
            placeholder="discount"
            value={discount}
            onChange={(ev) => {
              setDiscount(ev.target.value);
            }}
          />
          <div id="total">{price - discount}</div>
        </div>
        <input
          placeholder="count"
          type="number"
          value={count}
          onChange={(ev) => {
            setCount(ev.target.value);
          }}
        />
        <input
          placeholder="category"
          type="text"
          value={category}
          onChange={(ev) => {
            setCategory(ev.target.value);
          }}
        />
        {!isUpdate ? (
          <button onClick={() => handleCreateAndUpdate(true)}>Creat</button>
        ) : (
          <button onClick={() => handleCreateAndUpdate(false)}>update</button>
        )}
      </div>
      <div className="outputs">
        <div className="searchBlock">
          <input
            type="text"
            id="search"
            placeholder={"search by " + searchBy}
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
          />
          <div className="btnSearch">
            <button id="searchTitle" onClick={() => setSearchBy("title")}>
              Search By Title
            </button>
            <button id="searchCategory" onClick={() => setSearchBy("category")}>
              Search By Category
            </button>
          </div>
        </div>
        <button className="deleteAll" onClick={() => setShoreToDelete(true)}>
          Delete All
        </button>
        {products && (
          <Product
            productId={productId}
            products={products}
            setProducts={setProducts}
            searchBy={searchBy}
            search={search}
            handleUpdataOne={handleUpdataOne}
            efectAfterUpdate={efectAfterUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
