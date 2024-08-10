import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import OrdersComponent from "../../components/Orders/OrdersComponent";

function Orders() {
	return (
		<div>
			<div className="container-fluid admin-pages">
				<div className="row">
					<div className="col-md-3 admin-left-side">
						<AdminMenu />
					</div>
					<div className="col-md-9 admin-right-side">
						<OrdersComponent />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Orders;
