import React from "react";
import "./styles.css";
import config from "../../config";
import { Container, Nav } from "./styled-components";
import Dropdown from "react-dropdown";
// fusioncharts
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import Maps from "fusioncharts/fusioncharts.maps";
import USARegion from "fusionmaps/maps/es/fusioncharts.usaregion";
import ReactFC from "react-fusioncharts";
import "./charts-theme";

ReactFC.fcRoot(FusionCharts, Charts, Maps, USARegion);
// import formatNum from "./format-number";
const DashBoardContent = () => {
  const [items, setitems] = React.useState("");
  const [amRevenue, setamRevenue] = React.useState(null);
  const [ebRevenue, setebRevenue] = React.useState(null);
  const [etRevenue, setetRevenue] = React.useState(null);
  const [dropdownOptions, setdropdownOptions] = React.useState([]);
  const [selectedValue, setselectedValue] = React.useState(null);
  const [totalRevenue, settotalRevenue] = React.useState(null);
  const [productViews, setproductViews] = React.useState(null);
  const [purchaseRate, setpurchaseRate] = React.useState("");
  const [checkoutRate, setcheckoutRate] = React.useState("");
  const [abandonedRate, setabandonedRate] = React.useState("");
  const [ordersTrendStore, setordersTrendStore] = React.useState([]);

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

  React.useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];
        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        // dropdown options
        let dropdownOptions = [];

        for (let i = 0; i < rows.length; i++) {
          dropdownOptions.push(rows[i].month);
        }

        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();

        setitems(rows);
        setdropdownOptions(dropdownOptions);
        setselectedValue("Jan 2019");

        getData("Jan 2019");
      });
  }, []);

  const getData = (arg) => {
    // google sheets data
    const arr = items;
    const arrLen = arr.length;

    // kpi's
    // amazon revenue
    let amRevenue = 0;
    //ebay revenue
    let ebRevenue = 0;
    // etsy revenue
    let etRevenue = 0;
    // total revenue
    let totalRevenue = 0;
    // product views
    let productViews = 0;
    // purchase rate
    let purchaseRate = 0;
    // checkout rate
    let checkoutRate = 0;
    // abandoned rate
    let abandonedRate = 0;
    // order trend by brand
    let ordersTrendStore = [];
    // order trend by region
    let ordersTrendRegion = [];
    let orderesTrendnw = 0;
    let orderesTrendsw = 0;
    let orderesTrendc = 0;
    let orderesTrendne = 0;
    let orderesTrendse = 0;
    let selectedValue = null;

    for (let i = 0; i < arrLen; i++) {
      if (arg === arr[i]["month"]) {
        if (arr[i]["source"] === "AM") {
          amRevenue += parseInt(arr[i].revenue);
          ordersTrendStore.push({
            label: "Amazon",
            value: arr[i].orders,
            displayValue: `${arr[i].orders} orders`,
          });
        } else if (arr[i]["source"] === "EB") {
          ebRevenue += parseInt(arr[i].revenue);
          ordersTrendStore.push({
            label: "Ebay",
            value: arr[i].orders,
            displayValue: `${arr[i].orders} orders`,
          });
        } else if (arr[i]["source"] === "ET") {
          etRevenue += parseInt(arr[i].revenue);
          ordersTrendStore.push({
            label: "Etsy",
            value: arr[i].orders,
            displayValue: `${arr[i].orders} orders`,
          });
        }
        productViews += parseInt(arr[i].product_views);
        purchaseRate += parseInt(arr[i].purchase_rate / 3);
        checkoutRate += parseInt(arr[i].checkout_rate / 3);
        abandonedRate += parseInt(arr[i].abandoned_rate / 3);
        orderesTrendnw += parseInt(arr[i].orders_nw);
        orderesTrendsw += parseInt(arr[i].orders_sw);
        orderesTrendc += parseInt(arr[i].orders_c);
        orderesTrendne += parseInt(arr[i].orders_ne);
        orderesTrendse += parseInt(arr[i].orders_se);
      }
    }

    totalRevenue = amRevenue + ebRevenue + etRevenue;
    ordersTrendRegion.push(
      {
        id: "01",
        value: orderesTrendne,
      },
      {
        id: "02",
        value: orderesTrendnw,
      },
      {
        id: "03",
        value: orderesTrendse,
      },
      {
        id: "04",
        value: orderesTrendsw,
      },
      {
        id: "05",
        value: orderesTrendc,
      }
    );

    selectedValue = arg;

    setamRevenue(amRevenue);
    setebRevenue(ebRevenue);
    setetRevenue(etRevenue);
    settotalRevenue(totalRevenue);
    setproductViews(productViews);
    setpurchaseRate(purchaseRate);
    setcheckoutRate(checkoutRate);
    setabandonedRate(abandonedRate);

    setordersTrendStore(ordersTrendStore);
    setselectedValue(selectedValue);
  };

  // console.log(items);
  // console.log(amRevenue);

  const updateDashboard = (event) => {
    getData(event.value);
    setselectedValue(event.value);
  };

  return (
    <div className="flex_item_content">
      <Nav className="navbar fixed-top nav-secondary is-dark is-light-text">
        <Container className="text-medium">Summary</Container>
        <Container className="navbar-nav ml-auto">
          <Dropdown
            className="pr-2 custom-dropdown"
            options={dropdownOptions}
            onChange={updateDashboard}
            value={selectedValue}
            placeholder="Select an option"
          />
        </Container>
      </Nav>
      {/* content area start */}

      <div className="flex_item_content-1">
        <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
          <Container className="card grid-card is-card-dark">
            <Container className="card-heading">
              <Container className="is-dark-text-light letter-spacing text-small">
                Revenue from Amazon
              </Container>
              <Container className="card-heading-brand">
                <i className="fab fa-amazon text-large" />
              </Container>
            </Container>

            <Container className="card-value pt-4 text-x-large">
              <span className="text-large pr-1">$</span>
              {amRevenue}
            </Container>
          </Container>
        </Container>

        <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
          <Container className="card grid-card is-card-dark">
            <Container className="card-heading">
              <Container className="is-dark-text-light letter-spacing text-small">
                Revenue from ebay
              </Container>
              <Container className="card-heading-brand">
                <i className="fab fa-amazon text-large" />
              </Container>
            </Container>

            <Container className="card-value pt-4 text-x-large">
              <span className="text-large pr-1">$</span>
              {ebRevenue}
            </Container>
          </Container>
        </Container>

        <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
          <Container className="card grid-card is-card-dark">
            <Container className="card-heading">
              <Container className="is-dark-text-light letter-spacing text-small">
                Revenue from Etsy
              </Container>
              <Container className="card-heading-brand">
                <i className="fab fa-amazon text-large" />
              </Container>
            </Container>

            <Container className="card-value pt-4 text-x-large">
              <span className="text-large pr-1">$</span>
              {etRevenue}
            </Container>
          </Container>
        </Container>

        <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
          <Container className="card grid-card is-card-dark">
            <Container className="card-heading">
              <Container className="is-dark-text-light letter-spacing text-small">
                Total Revenue
              </Container>
              <Container className="card-heading-brand">
                <i className="fab fa-amazon text-large" />
              </Container>
            </Container>

            <Container className="card-value pt-4 text-x-large">
              <span className="text-large pr-1">$</span>
              {totalRevenue}
            </Container>
          </Container>
        </Container>

        <Container className="col-md-4 col-lg-3 is-light-text mb-4">
          <Container className="card grid-card is-card-dark">
            <Container className="card-heading mb-3">
              <Container className="is-dark-text-light letter-spacing text-small">
                Product Views
              </Container>
            </Container>
            <Container className="card-value pt-4 text-x-large">
              {productViews}
              <span className="text-medium pl-2 is-dark-text-light">views</span>
            </Container>
          </Container>
        </Container>
      </div>

      <div className="flex_item_content-2">
        {/* row 2 - conversion */}
        <Container className="row">
          <Container className="col-sm-4 full-height border-left border-right">
            <ReactFC
              {...{
                type: "doughnut2d",
                width: "290", // Width of the chart
                height: "200",
                dataFormat: "json",
                containerBackgroundOpacity: "0",
                dataSource: {
                  chart: {
                    caption: "Checkout Rate",
                    theme: "ecommerce",
                    legendPosition: "RIGHT",
                    defaultCenterLabel: `${purchaseRate}%`,
                    paletteColors: "#41B6C4, #000000",
                    showBorder: "1",
                    bgColor: "#2C211F",
                    bgAlpha: "50",
                  },
                  data: [
                    {
                      label: "active",
                      value: `${purchaseRate}`,
                    },
                    {
                      label: "inactive",
                      alpha: 5,
                      value: `${100 - purchaseRate}`,
                    },
                  ],
                },
              }}
            />
          </Container>
          <Container className="col-sm-4 full-height border-left border-right">
            <ReactFC
              {...{
                type: "doughnut2d",
                width: "290", // Width of the chart
                height: "200",
                dataFormat: "json",
                containerBackgroundOpacity: "0",
                dataSource: {
                  chart: {
                    caption: "Checkout Rate",
                    theme: "ecommerce",
                    legendPosition: "RIGHT",
                    defaultCenterLabel: `${checkoutRate}%`,
                    paletteColors: "#41B6C4, #000000",
                    showBorder: "1",
                    bgColor: "#2C211F",
                    bgAlpha: "50",
                  },
                  data: [
                    {
                      label: "active",
                      value: `${checkoutRate}`,
                    },
                    {
                      label: "inactive",
                      alpha: 5,
                      value: `${100 - checkoutRate}`,
                    },
                  ],
                },
              }}
            />
          </Container>
          <Container className="col-sm-4">
            <ReactFC
              {...{
                type: "doughnut2d",
                width: "290", // Width of the chart
                height: "200",
                marginTop: "100",
                dataFormat: "json",
                containerBackgroundOpacity: "0",
                dataSource: {
                  chart: {
                    caption: "Abandoned Cart Rate",
                    theme: "ecommerce",
                    defaultCenterLabel: `${abandonedRate}%`,
                    paletteColors: "#EDF8B1, #000000",
                    labelBgColor: "eeeeee",
                    showBorder: "1",
                    bgColor: "#2C211F",
                    bgAlpha: "50",
                  },
                  data: [
                    {
                      label: "active",
                      value: `${abandonedRate}`,
                    },
                    {
                      label: "inactive",
                      alpha: 5,
                      value: `${100 - abandonedRate}`,
                    },
                  ],
                },
              }}
            />
          </Container>
        </Container>
      </div>

      {/* row 3 - orders trend */}
      <div className="flex_item_content-3">
        <Container className="chart-container large ">
          <ReactFC
            {...{
              type: "bar2d",
              width: "290", // Width of the chart
              height: "200",
              marginTop: "100",
              dataFormat: "json",
              containerBackgroundOpacity: "0",
              dataEmptyMessage: "Loading Data...",
              dataSource: {
                chart: {
                  theme: "ecommerce",
                  caption: "Orders Trend",
                  subCaption: "By Stores",
                },
                data: ordersTrendStore,
              },
            }}
          />
        </Container>

        <Container className="chart-container large full-height">
          <ReactFC
            {...{
              type: "usaregion",
              width: "290", // Width of the chart
              height: "200",
              marginTop: "100",
              dataFormat: "json",
              containerBackgroundOpacity: "0",
              dataEmptyMessage: "Loading Data...",
              dataSource: {
                chart: {
                  theme: "ecommerce",
                  caption: "Orders Trend",
                  subCaption: "By Region",
                },
                colorrange: {
                  code: "#F64F4B",
                  minvalue: "0",
                  gradient: "1",
                  color: [
                    {
                      minValue: "10",
                      maxvalue: "25",
                      code: "#EDF8B1",
                    },
                    {
                      minvalue: "25",
                      maxvalue: "50",
                      code: "#18D380",
                    },
                  ],
                },
                data: ordersTrendStore,
              },
            }}
          />
        </Container>
      </div>
    </div>
  );
};

export default DashBoardContent;
//AIzaSyA9swjHoQSgIQ13F18I45HA0-siZQj-GE0
//https://console.cloud.google.com/apis/credentials?project=salesdashboard-320708
//https://scotch.io/tutorials/building-an-online-retail-dashboard-in-react
