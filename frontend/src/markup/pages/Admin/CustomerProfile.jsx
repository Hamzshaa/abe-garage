import React from "react";
import CustomerDetail from "../../components/Admin/CustomerDetail/CustomerDetail";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

function CustomerProfile() {
	return (
		<div>
			<div className="container-fluid admin-pages">
				<div className="row">
					<div className="col-md-3 admin-left-side">
						<AdminMenu />
					</div>
					<div className="col-md-9 admin-right-side">
						<CustomerDetail />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CustomerProfile;
