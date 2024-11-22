import Chart from "react-apexcharts";
import Customers from "@assets/customers.png";

const DashboardStats = () => {
  let data = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  }

  let linechart = {
    options: {
      series: [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
      chart: {
      type: 'line'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Sales Summary',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  }

  let donutChart = {
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ['A', 'B', 'C', 'D', 'E']
  }

  return (
    <div>
      <div className="flex gap-10 text-TextSecondaryColor">
        <div className="mt-4 flex w-[25%] bg-BgSecondaryColor border rounded border-BorderColor p-6">
          <div className="flex gap-5">
            <img src={Customers} alt="img" width="35" height="20"/>
            <div>
                <div className="font-bold">2000+</div>
                <div className="text-[0.8rem]">Total Customers</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-[25%] bg-BgSecondaryColor border rounded border-BorderColor p-6">
          <div className="flex gap-5">
          <img src={Customers} alt="img" width="35" height="20"/>
            <div>
                <div className="font-bold">140+</div>
                <div className="text-[0.8rem]">Total Products</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-[25%] bg-BgSecondaryColor border rounded border-BorderColor p-6">
          <div className="flex gap-5">
          <img src={Customers} alt="img" width="35" height="20"/>
            <div>
                <div className="font-bold">16+</div>
                <div className="text-[0.8rem]">Total Category</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-[25%] bg-BgSecondaryColor border rounded border-BorderColor p-6">
          <div className="flex gap-5">
          <img src={Customers} alt="img" width="35" height="20"/>
            <div>
                <div className="font-bold">2000+</div>
                <div className="text-[0.8rem]">Total Orders</div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 gap-4 mt-16">
        <div className="flex justify-end">
            <Chart
                options={linechart.options}
                series={linechart.series}
                type="line"
                width="1100"
                height= "300"
            />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex justify-center"> 
        <Chart 
            options={donutChart.options} 
            series={donutChart.series} 
            type="donut" 
            width="380" 
        />
        </div>
        <div className="flex justify-end"> 
          <Chart
            options={data.options}
            series={data.series}
            type="bar"
            width="500"
          />
        </div>
      </div> */}
    </div>
  )
}

export default DashboardStats;