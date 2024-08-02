import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import BarChartComponent from "../../../components/charts/BarChartComponent/BarChartComponent";

export default function BarChart() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <BarChartComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
