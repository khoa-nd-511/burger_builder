import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Spinner from "../../components/UI/Spinner/Spinner";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let burgerBuilder;
  let ings = {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0
  };

  beforeEach(() => {
    burgerBuilder = shallow(<BurgerBuilder onInitIngredients={() => { }} />);
    burgerBuilder.setProps({ ings });
  });

  it("should render <BuildControls /> if props.ings exits", () => {
    expect(burgerBuilder.find(BuildControls)).toHaveLength(1);
  });

  it("should render <Burger /> if props.ings exits", () => {
    expect(burgerBuilder.find(Burger)).toHaveLength(1);
  });

  it("should return proper vals when no ingredients selected", () => {
    expect(burgerBuilder.find(BuildControls).prop('disabled')).toEqual({
      salad: true,
      cheese: true,
      meat: true,
      bacon: true
    });
    expect(burgerBuilder.find(BuildControls).prop('showOrderBtn')).toEqual(true);
  });

  it('should return proper vals when at least meat and cheese are selected', () => {
    ings = {
      salad: 0,
      cheese: 1,
      meat: 1,
      bacon: 0
    };

    burgerBuilder.setProps({ ings });
    expect(burgerBuilder.find(BuildControls).prop('showOrderBtn')).toEqual(false);
  });

  it('should return error text when props.error & !props.loading', () => {
    let errorSnippet = (
      <p style={{ marginTop: "200px", textAlign: "center" }}>
        <b>Internal Server Error</b>
        <br />
        Please try going back another time....
      </p>
    )
    burgerBuilder.setState({ loading: false });
    burgerBuilder.setProps({ error: true });

    expect(burgerBuilder.find(Burger)).toHaveLength(0);
    expect(burgerBuilder.containsMatchingElement(errorSnippet)).toEqual(true);
  })

  it('should render <Spinner /> when props.loading', () => {
    burgerBuilder.setState({ loading: true });

    expect(burgerBuilder.contains(<Spinner />)).toEqual(true)
  });
});
