import Customers from "@assets/customers.png";
import { API_CONSTANTS } from "../../../constants/apiurl";
import { allApiWithHeaderToken } from "@api/api";
import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { ROUTES_CONSTANTS } from "../../../constants/routesurl";
import Chart from "react-apexcharts";

const DashboardStats = () => {
  const toast = useRef(null);
  const [loader, setLoader] = useState(false);
  const [counts, setCounts] = useState({
    productCounts: 0,
    categoryCounts: 0,
    subCategoryCounts: 0,
    orderCounts: 0,
    customerCounts: 0
  });

  let revenueByMonth = {
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false
        }
      },
      title: {
        text: 'Revenue By Month',
        align: 'left'
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30000, 40000, 500000, 80000, 490000, 550000, 700000, 910000, 500000, 80000, 490000, 500000]
      }
    ]
  }

  let transactionByMonth = {
    options: {
      series: [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }],
      chart: {
        type: 'line',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false,
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Transaction By Month',
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

  let comarisonOfRevenue = {
    series: [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],
    options: {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false,
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Comparison Of Revneues(Offline / Online)',
        align: 'left'
      },
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      }
    }
  }

  let yearWiseRevenue = {
    options: {
      title: {
        text: 'Product Wise Revenue(Yearly)',
        align: 'left'
      },
      labels: ['A', 'B', 'C', 'D', 'E'],
      chart: {
        toolbar: {
          show: false
        }
      },
    },
    series: [44, 55, 41, 17, 15]
  }

  let winterReasonRevenue = {
    options: {
      legend: {
        show: false
      },
      title: {
        text: 'Product Wise Revenue (Winter)',
        align: 'left'
      },
      chart: {
        toolbar: {
          show: false
        }
      },
    },
    series: [44, 55, 41, 17, 15],
    chartOptions: {
      labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
    },
  }

  let rainyReasonRevenue = {
    options: {
      title: {
        text: 'Product Wise Revenue (Rainy)',
        align: 'left'
      },
      legend: {
        show: false
      },
      chart: {
        toolbar: {
          show: false
        }
      }
    },
    series: [44, 55, 41, 17, 15],
    chartOptions: {
      labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
    }
  }

  let summerReasonRevenue = {
    options: {
      title: {
        text: 'Product Wise Revenue (Summer)',
        align: 'left'
      },
      legend: {
        show: false
      },
      chart: {
        toolbar: {
          show: false
        }
      }
    },
    series: [44, 55, 41, 17, 15],
    chartOptions: {
      labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
    }
  }

  const fetchCounts = () => {
    setLoader(true);
    allApiWithHeaderToken(`${API_CONSTANTS.COMMON_ADMIN_DASHBOARD_URL}/counts`, "" , "get")
      .then((response) => {
        if (response.status === 200) {
          let obj = {
            productCounts: response?.data?.product_count,
            categoryCounts: response?.data?.category_count,
            subCategoryCounts: response?.data?.sub_category_count
          }
          setCounts({...counts, ...obj});
        } 
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: err?.response?.data?.errors,
          life: 3000,
        });
        setLoader(false);
      }).finally(()=>{
        setLoader(false);
      });
  };

  useEffect(() => {
      fetchCounts();
  }, []);

  return (
    <div>
      <Toast ref={toast} position="top-right" />
      <div className="flex gap-10 text-TextSecondaryColor">
        <div className="mt-4 flex w-[25%] bg-BgSecondaryColor border rounded border-BorderColor p-6">
          <div className="flex gap-5">
          <img src={Customers} alt="img" width="35" height="20"/>
            <div>
                <div className="font-bold">{counts?.categoryCounts}+</div>
                <div className="text-[0.8rem]">Total Category</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-[25%] bg-BgSecondaryColor border rounded border-BorderColor p-6">
          <div className="flex gap-5">
          <img src={Customers} alt="img" width="35" height="20"/>
            <div>
                <div className="font-bold">{counts?.subCategoryCounts}+</div>
                <div className="text-[0.8rem]">Total SubCategory</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-[25%] bg-BgSecondaryColor border rounded border-BorderColor p-6">
          <div className="flex gap-5">
          <img src={Customers} alt="img" width="35" height="20"/>
            <div>
                <div className="font-bold">{counts?.productCounts}+</div>
                <div className="text-[0.8rem]">Total Products</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-[25%] bg-BgSecondaryColor border rounded border-BorderColor p-6">
          <div className="flex gap-5">
            <img src={Customers} alt="img" width="35" height="20"/>
            <div>
                <div className="font-bold">{counts?.customerCounts}+</div>
                <div className="text-[0.8rem]">Total Customers</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-10 text-TextSecondaryColor">
        <div className="mt-4 flex w-[22.5%] bg-BgSecondaryColor border rounded border-BorderColor p-6">
          <div className="flex gap-5">
          <img src={Customers} alt="img" width="35" height="20"/>
            <div>
                <div className="font-bold">{counts?.orderCounts}+</div>
                <div className="text-[0.8rem]">Total Order</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-[22.5%] bg-BgSecondaryColor border rounded border-BorderColor p-6">
          <div className="flex gap-5">
          <img src={Customers} alt="img" width="35" height="20"/>
            <div>
                <div className="font-bold">-</div>
                <div className="text-[0.8rem]">Total Revenue</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-12">
        <div className="flex justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm"> 
           <Chart
            options={revenueByMonth.options}
            series={revenueByMonth.series}
            type="bar"
            width="550"
          />
        </div>
        <div className="flex justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm"> 
          <Chart 
            options={yearWiseRevenue.options} 
            series={yearWiseRevenue.series} 
            type="donut" 
            width="500" 
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-12">
        {/* Season Wise Revenue */}
        <div className="flex justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <Chart 
            options={winterReasonRevenue.options} 
            series={winterReasonRevenue.series} 
            type="donut" 
            width="380" 
          />
        </div>
        <div className="flex justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <Chart 
            options={rainyReasonRevenue.options} 
            series={rainyReasonRevenue.series} 
            type="donut" 
            width="380" 
          />
        </div>
        <div className="flex justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <Chart 
            options={summerReasonRevenue.options} 
            series={summerReasonRevenue.series} 
            type="donut" 
            width="380" 
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-16">
        <div className="flex justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <Chart
              options={transactionByMonth.options}
              series={transactionByMonth.series}
              type="line"
              width="550" 
          />
        </div>
        <div className="flex justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <Chart
              options={comarisonOfRevenue.options}
              series={comarisonOfRevenue.series}
              type="area"
              width="550" 
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardStats;