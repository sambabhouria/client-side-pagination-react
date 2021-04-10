import React, { Component } from "react";

class ProductItem extends Component {
  render() {
    var { product, index } = this.props;

    return (
      <tr>
        <td className="col_order text-center">{index + 1}</td>
        <td className="col_name">
          {product.name} (id={product.id})
        </td>
      </tr>
    );
  }
}

export default ProductItem;
