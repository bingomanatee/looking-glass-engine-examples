import React, { Component } from "react";
import shoppingCart from "./shoppingCart";
import {
  Box,
  Text,
  Select,
  Heading,
  Grid,
  RangeInput,
  TextInput,
  Layer,
  List
} from "grommet";
import { FormEdit, FormCheckmark, Add, Subtract, StopFill } from "grommet-icons";

import Product from "./../local-state/Product";

const pc = ({color}) => `rgb(${color.join(',')})`
export default class GlobalState extends Component {
  constructor(props) {
    super(props);
    this.state = { ...shoppingCart.values };
  }

  componentDidMount() {
    this._sub = shoppingCart.subscribeToValue(state => {
      this.setState(state);
      if (this.props.onChange) {
        this.props.onChange(state);
      }
    });
  }

  componentWillUnmount() {
    if (this._sub) this._sub.unsubscribe();
  }

  render() {
    const { products, currentProduct, purchases } = this.state;
    return (
      <>
        <Box direction="column" fill={true} pad="small">
          <Heading level="2" style={{ textAlign: "center" }} alginSelf="center">
            Catalog
          </Heading>
          <Box fill={true} direction="row">
            {products.map(P => (
              <Box
                pad="small"
                width="15rem"
                height="10rem"
                margin="0.5rem"
                round="0.5rem"
                hoverIndicator={{ color: "accent-2" }}
                onClick={() => shoppingCart.do.setCurrentProduct({ ...P })}
                border={{ width: 2, color: "accent-2", radius: "2rem" }}
              >
                <Heading
                  alignSelf="center"
                  style={{ textAlign: "center" }}
                  level="4"
                >
                  {P.name}
                </Heading>
                <P.Image style={{ width: "100%", height: "100%" }} />
              </Box>
            ))}
          </Box>
          <List data={purchases}>
            {(product) => <Box direction="row" fill="horizontal">
              <Box direction="row" fill="horizontal">
              <StopFill color={pc(product)} />
              <Text weight="bold">  
              {product.name} ({product.quantity})</Text>
              </Box>
              <Text textAlign="right">{product.cost}</Text>
            </Box>}
          </List>
        </Box>
        {currentProduct && (
          <Layer full={true}>
            <Product
              onClick={(product) => {
                shoppingCart.do.addPurchase(product);
              }}
              {...currentProduct}
            />
          </Layer>
        )}
      </>
    );
  }
}
