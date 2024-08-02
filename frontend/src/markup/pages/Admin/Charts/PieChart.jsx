import PieChartComponent from "../../../components/charts/PieChartComponent/PieChartComponent";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";

export default function PieChart() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <PieChartComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
