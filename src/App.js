import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProductItem from "./components/ProductItem";
import ProductSearchControl from "./components/ProductSearchControl";
import Pagination from "./components/Pagination";
import { actSearchProduct } from "./actions/index";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalRecords: "",
      totalPages: "",
      pageLimit: "",
      currentPage: "",
      startIndex: "",
      endIndex: ""
    };
  }

  componentDidMount() {
    console.log('products', this.props.products);
    console.log('keyword', this.props.keyword);
    // this.props.fetchAllProducts();
    this.setState({
      totalRecords: this.props.products.length
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     totalRecords: nextProps.products.length
  //   });
  // }

  showProducts = products => {
    console.log('Products to show', products )
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return <ProductItem key={index} product={product} index={index} />;
      });
    }
    return result;
  };

  onSearch = keyword => {
    this.props.onSearchProduct(keyword);
  };

  onChangePage = data => {
    this.setState({
      pageLimit: data.pageLimit,
      totalPages: data.totalPages,
      currentPage: data.page,
      startIndex: data.startIndex,
      endIndex: data.endIndex
    });
  };

  render() {
    var { keyword, products } = this.props;
    var {
      totalPages,
      currentPage,
      pageLimit,
      startIndex,
      endIndex
    } = this.state;
    var rowsPerPage = [];

    // Chercher
    if (keyword) {
      products = products.filter(product => {
        console.log("keyword", keyword);
        return product.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }

    rowsPerPage = products.slice(startIndex, endIndex + 1);

    return (
      <div className="section product_list_mng">
        <div className="container-fluid">
          <div className="box_product_control mb-15">
            <div className="row">
              <ProductSearchControl
                onSearch={this.onSearch}
                keyword={this.props.keyword}
              />
              <div className="col-xs-12 box_change_pagelimit">
                Affichage
                <select
                  className="form-control"
                  value={pageLimit}
                  onChange={e =>
                    this.setState({ pageLimit: parseInt(e.target.value) })
                  }
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                produit
              </div>
            </div>
          </div>
          <div className="box_tbl_list">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th className="text-center">No</th>
                  <th className="text-center">Product name</th>
                </tr>
              </thead>
              <tbody>{this.showProducts(rowsPerPage)}</tbody>
            </table>
          </div>
          <div className="box_pagination">
            <div className="row">
              <div className="col-xs-12 box_pagination_info text-right">
                <p>
                  {products.length} Produits | Page {currentPage}/{totalPages}
                </p>
              </div>
              <div className="col-xs-12 text-center">
                <Pagination
                  totalRecords={products.length}
                  pageLimit={pageLimit || 5}
                  initialPage={1}
                  pagesToShow={5}
                  onChangePage={this.onChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  keyword: PropTypes.string,
  onSearchProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    products: state.products,
    keyword: state.search
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSearchProduct: keyword => {
      dispatch(actSearchProduct(keyword));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
