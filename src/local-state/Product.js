import React, { Component } from "react";
import { ValueStream } from "@wonderlandlabs/looking-glass-engine";
import {
  Box,
  Text,
  ThemeContext,
  Heading,
  Grid,
  RangeInput,
  TextInput,
  Button,
  Main,
  Footer
} from "grommet";
import { FormEdit, FormCheckmark, Add, Subtract } from "grommet-icons";
import _ from "lodash";

import TeddyBear from "./../img/TeddyBear";
export default class Product extends Component {
  constructor(props) {
    super(props);

    this.store = new ValueStream("teddyBear")
      .addAction("makeBearColor", store => {
        const [red, green, blue] = store.get("color");
        store.do.setBearColor(`rgb(${red},${green},${blue})`);
      })
      .addProp("name", _.get(props, "name", "Timothy The Bear"), "string")
      .addProp("color", _.get(props, "color", [255, 200, 200]), "array")
      .watch("color", "makeBearColor")
      .addProp("bearColor", "black", "string")
      .addProp("editingName", false, "boolean")
      .addAction("setColorValue", (store, i, v) => {
        const color = [...store.my.color];
        color[i] = v;
        store.do.setColor(color);
      })
      .addAction("toggleEditingName", store => {
        store.do.setEditingName(!store.my.editingName);
      })
      .addAction("addQuantity", store => {
        store.do.setQuantity(store.my.quantity + 1);
      })
      .addAction("subQuantity", store => {
        store.do.setQuantity(Math.max(1, store.my.quantity - 1));
      })
      .addProp('cost', _.get(props, 'cost', 100), 'number')
      .addProp("quantity", 1, "integer");

    this.store.do.makeBearColor();

    this.state = this.store.values;
  }

  componentDidMount() {
    this._sub = this.store.subscribeToValue(state => {
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
    const { bearColor, name, editingName, color, quantity, cost } = this.state;
    const Image = _.get(this.props, "Image", TeddyBear);
    return (
      <Box pad="small" fill={true}>
        <Grid
          rows={["auto", "3rem", "3rem", "3rem"]}
          columns={["1/2", "auto", "small"]}
          fill={true}
          areas={[
            { name: "teddyBear", start: [0, 0], end: [0, 0] },
            { name: "teddyBearControls", start: [1, 0], end: [2, 0] },
            { name: "redRange", start: [0, 1], end: [1, 1] },
            { name: "redLabel", start: [2, 1], end: [2, 1] },
            { name: "greenRange", start: [0, 2], end: [1, 2] },
            { name: "greenLabel", start: [2, 2], end: [2, 2] },
            { name: "blueRange", start: [0, 3], end: [1, 3] },
            { name: "blueLabel", start: [2, 3], end: [2, 3] }
          ]}
        >
          <Box gridArea="teddyBear" pad="large">
            <Heading level={2}>
              {editingName ? (
                <Box direction="row" fill="horizontal" alignContent="center">
                  <FormCheckmark
                    size="large"
                    color="green"
                    onClick={this.store.do.toggleEditingName}
                  />
                  <TextInput
                    value={name}
                    onChange={e => {
                      this.store.do.setName(e.target.value);
                    }}
                  />
                </Box>
              ) : (
                <Box direction="row" fill="horizontal" alignContent="center">
                  <FormEdit
                    size="medium"
                    color="darkOrange"
                    onClick={this.store.do.toggleEditingName}
                  />
                  {name}
                </Box>
              )}
            </Heading>
            <Image
              style={{ width: "100%", height: "100%", color: bearColor }}
            />
          </Box>
          <Box gridArea="teddyBearControls" fill={true} 
          alignContent="stretch"
          direction="column" pad="large">
            <Heading level="2" alignSelf="center">
              Quantity
            </Heading>
            <Box
              direction="row"
              align="center"
              style={{ userSeelct: "none" }}
            >
              <Button onClick={this.store.do.addQuantity}  plain><Add/></Button>
              <Box
                border="accent-2"
                fill="horizontal"
                pad="small"
                focusIndicator={false}
                margin="small"
                align="center"
                style={{ userSelect: "none" }}
              >
                {quantity}
              </Box>
              <Button plain onClick={this.store.do.subQuantity} ><Subtract /></Button>
            </Box>
            <Heading level="2" alignSelf="center">
              Cost
            </Heading>
            <Text textAlign="center" size="large" margin="large">
              {cost} each - {cost * quantity} total
            </Text>
            <Footer>
            {this.props.onClick && (
              <Button plain={false} margin="small"  onClick={() => this.props.onClick(this.state)}
               style={{whiteSpace: 'nowrap'}} primary>
                Add to Cart
              </Button>
            )}      
              {this.props.onClick && (
              <Button plain={false} margin="small" onClick={() => this.props.onClick(false)} 
              style={{whiteSpace: 'nowrap'}}>
                Cancel
              </Button>)}
            </Footer>
          </Box>
          {["red", "green", "blue"].map((c, i) => {
            return (
              <ThemeContext.Extend
                value={{
                  rangeInput: { thumb: { color: c }, track: { height: "1px" } }
                }}
              >
                <Box gridArea={c + "Range"}>
                  <RangeInput
                    value={color[i]}
                    min="0"
                    max="255"
                    step="5"
                    onChange={e => {
                      this.store.do.setColorValue(i, e.target.value);
                    }}
                  />
                </Box>
                <Box
                  alignContent="center"
                  justify="center"
                  align="center"
                  direction="row"
                  fill="horizontal"
                  gridArea={c + "Label"}
                >
                  <b>{_.upperFirst(c)}</b>
                </Box>
              </ThemeContext.Extend>
            );
          })}
        </Grid>
      </Box>
    );
  }
}
