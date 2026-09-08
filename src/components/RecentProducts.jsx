function RecentProducts({ products }) {

  return (
    <div className="products-card">

      <div className="table-header">

        <div>

          <h3>
            Top Products
          </h3>

          <p>
            Best selling products
          </p>

        </div>

        <button className="view-button">
          Manage
        </button>

      </div>


      <div className="product-list">

        {products.length > 0 ? (

          products.map((product) => (

            <div
              className="product-row"
              key={product.id}
            >

              <div className="product-image">

                {product.image}

              </div>


              <div className="product-info">

                <strong>
                  {product.name}
                </strong>

                <span>
                  {product.category}
                </span>

              </div>


              <div className="product-price">

                ${product.price}

              </div>


              <div className="product-stock">

                {product.stock} left

              </div>

            </div>

          ))

        ) : (

          <div className="products-empty">

            <span>
              No products yet
            </span>

          </div>

        )}

      </div>

    </div>
  );
}


export default RecentProducts;