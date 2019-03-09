import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavItems from "./NavItems";
import NavItem from "./NavItem/NavItem";

configure({ adapter: new Adapter() });

describe("<NavItems", () => {
  let navItems;

  beforeEach(() => {
    navItems = shallow(<NavItems isAuthenicated />);
  });

  it("should render 2 <NavItem /> when un-authenticated", () => {
    navItems.setProps({ isAuthenicated: false });
    expect(navItems.find(NavItem)).toHaveLength(2);
  });

  it("should render 3 <NavItem /> when authenticated", () => {
    expect(navItems.find(NavItem)).toHaveLength(3);
  });

  it("should render Logout and Orders Item when authenticated", () => {
    expect(navItems.contains(<NavItem link="/logout">Logout</NavItem>)).toBeTruthy();
    expect(navItems.contains(<NavItem link="/orders">Orders</NavItem>)).toBeTruthy();
  });
});
