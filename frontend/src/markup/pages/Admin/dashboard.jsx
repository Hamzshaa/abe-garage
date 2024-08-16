import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AdminDashboard from "../../components/Admin/Dashboard/dashboard";

function Dashboard() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div
            className="col-md-9 admin-right-side"
            style={{ backgroundColor: "#dae3f0" }}
          >
          <div className="col-md-9 admin-right-side">
            <AdminDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
