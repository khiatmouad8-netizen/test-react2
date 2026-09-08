function RecentOrders({ orders }) {

  return (
    <div className="table-card">

      <div className="table-header">

        <div>

          <h3>
            Recent Orders
          </h3>

          <p>
            Latest customer orders
          </p>

        </div>

        <button className="view-button">
          View All
        </button>

      </div>


      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>
                Order ID
              </th>

              <th>
                Customer
              </th>

              <th>
                Product
              </th>

              <th>
                Amount
              </th>

              <th>
                Status
              </th>

            </tr>

          </thead>


          <tbody>

            {orders.length > 0 ? (

              orders.map((order) => (

                <tr key={order.id}>

                  <td>
                    <strong>
                      {order.id}
                    </strong>
                  </td>

                  <td>
                    {order.customer}
                  </td>

                  <td>
                    {order.product}
                  </td>

                  <td>
                    <strong>
                      ${Number(order.amount).toFixed(2)}
                    </strong>
                  </td>

                  <td>

                    <span
                      className={`status ${
                        order.status
                          .toLowerCase()
                          .replace(" ", "-")
                      }`}
                    >
                      {order.status}
                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="empty-state"
                >
                  No orders yet
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}


export default RecentOrders;