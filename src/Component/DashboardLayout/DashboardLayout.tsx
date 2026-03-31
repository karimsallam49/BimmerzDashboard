import './DashboardLayout.css';
export const DashboardLayout = () => {

  const orders = [
    {
      order_number: "ORD-1001",
      marketplace: "Noon",
      qty: 2,
      status: "Pending",
      created_at: "2026-03-10"
    },
    {
      order_number: "ORD-1002",
      marketplace: "Amazon",
      qty: 1,
      status: "Completed",
      created_at: "2026-03-09"
    }
  ];

  return (
    <div className="dashboard-page w-100">


      <div className="dashboard-alert warning">
        You have an upcoming holiday on 19th March, please fulfill all your pending orders
      </div>

      <div className="dashboard-alert info">
        DirectShip is getting a new look soon.
        <a href="#">Explore Now</a>
      </div>



      <div className="dashboard-header">

        <h4>DirectShip</h4>

        <div className="dashboard-actions">

          <input
            type="text"
            placeholder="Search by PSKU, Order No, AWB"
          />

          <button>Filter</button>
          <button>Export</button>

        </div>

      </div>



      <div className="dashboard-tabs">

        <button className="active">Pending</button>
        <button>Completed</button>
        <button>Lost</button>

      </div>



      <div className="dashboard-card">

        <div className="dashboard-card-header">

          <span>100 / page</span>
          <span>No Pending Shipments</span>

        </div>


        <div className="dashboard-table">

          <table>

            <thead>
              <tr>
                <th>Order No.</th>
                <th>Marketplace</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Received at</th>
              </tr>
            </thead>

            <tbody>

              {orders.length > 0 ? (

                orders.map((order, index) => (

                  <tr key={index}>
                    <td>{order.order_number}</td>
                    <td>{order.marketplace}</td>
                    <td>{order.qty}</td>
                    <td>
                      <span className={`status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.created_at}</td>
                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan={5} className="empty">
                    No data
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};