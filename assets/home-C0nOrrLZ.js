import{r as i,j as s,N as n,C as g,O as x}from"./index-BukhmdVY.js";import{s as a,g as r,B as j,a as c,A as d,M as v}from"./home.module-CNZRFRmA.js";const h=()=>{const[l,t]=i.useState("homeLogo"),[m,e]=i.useState("statsLogo");return s.jsx(s.Fragment,{children:s.jsxs("div",{className:a.container,children:[s.jsxs("div",{className:a.navLinksContainer,children:[s.jsxs(n,{onClick:o=>o&&(t("homeLogoColor"),e("statsLogo")),className:({isActive:o})=>o?`${a.navigation} ${a.active}`:a.navigation,to:"",end:!0,children:[s.jsx("img",{src:r(l),className:a.icon}),"Home"]}),s.jsxs(n,{onClick:o=>o&&(t("homeLogo"),e("statsLogoColor")),className:({isActive:o})=>o?`${a.navigation} ${a.active}`:a.navigation,to:"statistics",children:[s.jsx("img",{src:r(m),className:a.icon}),"Statistics"]})]}),s.jsx(j,{}),s.jsx(g,{})]})})};function N(){return s.jsxs("div",{className:c.homeContainer,children:[s.jsx(d,{}),s.jsx(h,{}),s.jsx("div",{className:c.outletContainer,children:s.jsx(x,{})}),s.jsx(v,{})]})}export{N as default};