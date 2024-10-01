import axios from "axios";

const Product = ({
  products,
  setProducts,
  search,
  searchBy,
  handleUpdataOne,
  productId,
  efectAfterUpdate,
}) => {
  async function handledeleteOne(id) {
    await axios.delete("/product/" + id);
    setProducts(products.filter((product) => product._id !== id));
  }

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>price</th>
            <th>discount</th>
            <th>total</th>
            <th>category</th>
            <th>count</th>
            <th>update</th>
            <th>delet</th>
          </tr>
        </thead>
        <tbody id="tbody">
          {products &&
            products.map((product, index) => {
              if (search && searchBy) {
                if (
                  searchBy === "title"
                    ? product.title.includes(search)
                    : product.category.includes(search)
                ) {
                  return (
                    <tr
                      className={
                        efectAfterUpdate && productId === product._id
                          ? "updated"
                          : ""
                      }
                      key={product._id}
                    >
                      <td>{index}</td>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>{product.discount}</td>
                      <td>{product.total}</td>
                      <td>{product.category}</td>
                      <td>{product.count}</td>
                      <td>
                        <button onClick={() => handleUpdataOne(product._id)}>
                          Update
                        </button>
                      </td>
                      <td>
                        <button onClick={() => handledeleteOne(product._id)}>
                          Delet
                        </button>
                      </td>
                    </tr>
                  );
                } else {
                  return;
                }
              } else {
                return (
                  <tr
                    className={
                      efectAfterUpdate && productId === product._id
                        ? "updated"
                        : ""
                    }
                    key={product._id}
                  >
                    <td>{index}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.discount}</td>
                    <td>{product.total}</td>
                    <td>{product.category}</td>
                    <td>{product.count}</td>
                    <td>
                      <button onClick={() => handleUpdataOne(product._id)}>
                        Update
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handledeleteOne(product._id)}>
                        Delet
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
