import React, { Component } from "react";
import { Input, Card, CardBody, CardTitle } from "mdbreact";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

import "./style.css";
const options = [];
const delivery = [
  { label: "1 Week", value: 1, days: 7 },
  { label: "2 Weeks", value: 2, days: 14 },
  { label: "1 Month", value: 3, days: 30 },
  { label: "More", value: 4, days: 123 }
];

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    borderBottom: "1px dotted pink",
    color: state.selectProps.menuColor,
    padding: 20,
    textAlign: "left"
  }),

  control: (_, { selectProps: { width } }) => ({
    width: width
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      search: "",
      dataSource: [],
      value: null,
      furniture_styles: [],
      products: []
    };
  }

  componentDidMount() {
    return fetch("https://www.mocky.io/v2/5c9105cb330000112b649af8")
      .then(response => response.json())
      .then(responseJson => {
        var response1 = { ...responseJson };
        //console.log(response1.products);
        this.setState({
          isLoading: false,
          dataSource: responseJson.products,
          products: response1.products,
          furniture_styles: response1.furniture_styles
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderCountry = (product, key) => {
    var furniture = "";
    var furniture_new = { ...product };
    return (
      <div className="col-md-6" style={{ marginTop: "20px" }} key={key}>
        <Card>
          <CardBody>
            <p style={{ textAlign: "left" }}>
              <li className="d-flex justify-content-between align-items-center">
                <p style={{ fontWeight: "bold", fontSize: "14px" }}>
                  {product.name}
                </p>
                <span className="badge badge-warning badge-pill">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumSignificantDigits: 2
                  }).format(product.price)}
                </span>
              </li>
            </p>
            <CardTitle
              title={product.description}
              style={{ textAlign: "left" }}
            >
              {product.description.substring(0, 114)}
              {product.description.length > 114 && "..."}
            </CardTitle>
            <CardTitle style={{ textAlign: "left" }}>
              {furniture_new.furniture_style.map((data, key) => {
                furniture = furniture + " " + data;
                return "";
              })}
              <p style={{ fontSize: "14px", color: "blue" }}>{furniture}</p>
            </CardTitle>
            <p
              style={{
                fontSize: "16px",
                color: "blue",
                fontWeight: "bold",
                textAlign: "right",
                textDecoration: " underline blue"
              }}
            >
              {product.delivery_time} Days
            </p>
          </CardBody>
        </Card>
      </div>
    );
  };

  onchange = e => {
    this.setState({ search: e.target.value });
  };

  selectted = e => {
    //  console.log(e.label);
    var s = [];
    e.map(dat => {
      this.state.dataSource.map((data, key) => {
        var val2 = data.furniture_style;
        val2.map(val => {
          if (dat.label === val) {
            if (!s.includes(data)) {
              s.push(data);

              this.setState({ products: s });
            }
          }

          return 0;
        });

        return 0;
      });

      return 0;
    });
    if (s.length === 0) {
      this.setState({
        products: this.state.dataSource
      });
    }
  };

  selectted_time = e => {
    var s = [];
    e.map(dat => {
      this.state.dataSource.map(data => {
        //  console.log(dat.label);
        var time = data.delivery_time;
        if (dat.label === "1 Week") {
          if (parseInt(time) <= 7) {
            if (!s.includes(data)) {
              s.push(data);

              this.setState({ products: s });
            }
          }
        } else if (dat.label === "2 Weeks") {
          if (parseInt(time) <= 14) {
            if (!s.includes(data)) {
              s.push(data);

              this.setState({ products: s });
            }
          }
        } else if (dat.label === "1 Month") {
          if (parseInt(time) <= 30) {
            if (!s.includes(data)) {
              s.push(data);

              this.setState({ products: s });
            }
          }
        } else if (dat.label === "More") {
          if (!s.includes(data)) {
            s.push(data);

            this.setState({ products: s });
          }
        }

        return 0;
      });

      return 0;
    });
    if (s.length === 0) {
      this.setState({
        products: this.state.dataSource
      });
    }
  };

  render() {
    var options = [];
    const filteredProduct = this.state.products.filter(product => {
      return (
        product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });

    this.state.furniture_styles.map((data, key) => {
      options.push({ label: data, value: key });

      return 0;
    });

    return (
      <div className="flyout">
        <div className="row" style={{ backgroundColor: "#11b3d6" }}>
          <div className="col" style={{ marginLeft: "90px" }}>
            <Input
              label="Search Furniture"
              icon="search"
              onChange={this.onchange}
            />
          </div>
          <div className="col" />
        </div>
        <div className="row" style={{ backgroundColor: "#11b3d6" }}>
          <div className="col" style={{ marginLeft: "70px" }}>
            <ReactMultiSelectCheckboxes
              width="500px"
              menuColor="red"
              styles={customStyles}
              options={options}
              onChange={this.selectted}
              dropdownButton={{ width: "30px" }}
              placeholderButtonLabel="Furniture Style"
            />
          </div>
          <div className="col" style={{ marginRight: "70px" }}>
            <ReactMultiSelectCheckboxes
              width="500px"
              menuColor="red"
              styles={customStyles}
              options={delivery}
              onChange={this.selectted_time}
              dropdownButton={{ width: "30px" }}
              placeholderButtonLabel="Delivery Time"
            />
          </div>
        </div>

        <main style={{ marginTop: "1rem", marginBottom: "12px" }}>
          <div className="container">
            <div className="row">
              {filteredProduct.map((product, key) => {
                return this.renderCountry(product, key);
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
