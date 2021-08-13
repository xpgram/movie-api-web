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
  shape = <svg viewBox="0 0 1200 1100" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><path d="M571.57 113.35a31.048 31.048 0 0156.86 0l115.139 262.289a25.092 25.092 0 0020.482 14.88l285.027 28.453a31.048 31.048 0 0126.448 21.3 31.06 31.06 0 01-8.869 32.776L852.782 663.605a25.093 25.093 0 00-7.824 24.078l61.02 279.872a31.047 31.047 0 01-12.085 31.732 31.057 31.057 0 01-33.914 1.695L612.659 856.46a25.088 25.088 0 00-25.318 0l-247.32 144.523a31.057 31.057 0 01-33.914-1.695 31.047 31.047 0 01-12.085-31.732l61.02-279.872a25.094 25.094 0 00-7.825-24.078L133.346 473.048a31.048 31.048 0 0117.57-54.076l285.032-28.452a25.099 25.099 0 0020.482-14.881l115.14-262.29z"/></svg>
}

export class IArrowUp extends IconGeneric {
  shape = <svg viewBox="0 0 1150 1200" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><path d="M742.01 1099.995H407.99V643.437H125L575 99.992l450 543.445H742.01v456.558z"/></svg>
}

export class IArrowDown extends IconGeneric {
  shape = <svg viewBox="0 0 1150 1200" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><path d="M407.99 100.002h334.02V556.56H1025l-450 543.445L125 556.56h282.99V100.002z"/></svg>
}