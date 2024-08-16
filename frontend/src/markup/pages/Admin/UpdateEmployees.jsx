// import AddEmployeeForm from "../../components/Admin/AddEmployeeForm/AddEmployeeForm";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import UpdateForm from "../../components/Admin/UpdateForm/UpdateForm";

function UpdateEmployees() {
	return (
		<div>
			<div className="container-fluid admin-pages">
				<div className="row">
					<div className="col-md-3 admin-left-side">
						<AdminMenu />
					</div>
					<div className="col-md-9 admin-right-side">
						<UpdateForm />
					</div>
				</div>
			</div>
		</div>
	);
}

export default UpdateEmployees;
