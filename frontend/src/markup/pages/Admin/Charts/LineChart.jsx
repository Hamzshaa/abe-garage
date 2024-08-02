import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import LineChartComponent from "../../../components/charts/LineCharComponent/LineCharComponent";

export default function LineChart() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <LineChartComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
