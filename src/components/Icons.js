import React, { Component } from "react";

class IconGeneric extends Component {
  shape = <></>;
  render() {
    return React.cloneElement(this.shape, this.props);
  }
}

export class IMagnifyingGlass extends IconGeneric {
  shape = <svg viewBox="0 0 1600 1200" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><path d="M1032.255 923.462c-87.405 67.955-197.17 108.426-316.311 108.426C431.187 1031.888 200 800.701 200 515.944 200 231.187 431.187 0 715.944 0c284.757 0 515.944 231.187 515.944 515.944 0 119.142-40.47 228.906-108.426 316.311l276.533 276.533-91.207 91.207-276.533-276.533zM715.944 128.986c213.569 0 386.958 173.39 386.958 386.958 0 213.569-173.39 386.958-386.958 386.958-213.569 0-386.958-173.39-386.958-386.958 0-213.569 173.39-386.958 386.958-386.958z"/></svg>;
}

export class ICross extends IconGeneric {
  shape = <svg viewBox="0 0 1600 1200" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><path d="M854.97 447.361c-30.968 28.653-78.96 28.656-109.94 0L397.669 100 300 197.669 647.361 545.03c28.653 30.968 28.656 78.96 0 109.94L300 1002.33l97.669 97.67L745.03 752.639c30.968-28.653 78.96-28.656 109.94 0L1202.33 1100l97.67-97.67-347.361-347.36c-28.653-30.968-28.656-78.96 0-109.94L1300 197.669 1202.33 100 854.97 447.361z"/></svg>;
}

export class IStar extends IconGeneric {
  shape = <svg viewBox="0 0 1600 1200" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><path d="M752.383 27.166A55.314 55.314 0 01800 0a55.314 55.314 0 0147.617 27.166l165.35 279.71 317.116 70.821a55.32 55.32 0 0140.55 36.893 55.31 55.31 0 01-11.121 53.68l-214.924 243.694 30.639 323.482a55.313 55.313 0 01-22.557 49.965 55.306 55.306 0 01-54.49 6.01L800 962.321l-298.18 129.1a55.306 55.306 0 01-54.49-6.01 55.313 55.313 0 01-22.557-49.965l30.64-323.482L240.487 468.27a55.31 55.31 0 01-11.122-53.68 55.32 55.32 0 0140.551-36.893l317.116-70.82 165.35-279.711z"/></svg>;
}