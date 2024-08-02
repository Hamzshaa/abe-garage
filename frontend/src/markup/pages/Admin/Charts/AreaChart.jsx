import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import AreaChartComponent from "../../../components/charts/AreaChartComponent/AreaChartComponent";

export default function AreaChart() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AreaChartComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
