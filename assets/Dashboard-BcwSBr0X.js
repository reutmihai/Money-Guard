import{u as i,a as g,j as e,d as m,P as j,b as t,r as b,e as y}from"./index-BgLegnsS.js";const x="_dashboardContainer_1p01x_1",p="_logOutContainer_1p01x_10",l={dashboardContainer:x,logOutContainer:p};function C(){const r=i(),c=g(),s=()=>{r(m()).unwrap().then(()=>{localStorage.removeItem("token"),c("/Money-Guard/login",{replace:!0})}).catch(o=>{console.error("Logout failed:",o)})};return e.jsxs("div",{className:l.logOutContainer,children:[e.jsx("div",{children:e.jsx("h2",{children:"Money Guard"})}),e.jsx("button",{onClick:s,children:"Log Out"})]})}const B="_balanceContainer_141u4_1",E="_balanceTitle_141u4_12",T="_balanceAmount_141u4_21",D="_negativeBalance_141u4_33",n={balanceContainer:B,balanceTitle:E,balanceAmount:T,negativeBalance:D},d=({totalBalance:r})=>{const c=r>=0?n.positiveBalance:n.negativeBalance;return e.jsxs("div",{className:n.balanceContainer,children:[e.jsx("h2",{className:n.balanceTitle,children:"YOUR BALANCE"}),e.jsxs("p",{className:`${n.balanceAmount} ${c}`,children:["$",r?r.toFixed(2):"0.00"]})]})};d.propTypes={totalBalance:j.number.isRequired};const G=r=>r.currency.data,z=r=>r.currency.isLoading,Y=r=>r.currency.error,W="_currency_wrapper_1i9dp_1",L="_currency_table_1i9dp_11",M="_currency_table_head_1i9dp_19",Z="_table_body_1i9dp_32",v="_currency_tr_1i9dp_37",w="_diagram_1i9dp_49",J="_lowerNumber_1i9dp_53",H="_higherNumber_1i9dp_63",O="_currency_item_1i9dp_85",a={currency_wrapper:W,currency_table:L,currency_table_head:M,table_body:Z,currency_tr:v,diagram:w,lowerNumber:J,higherNumber:H,currency_item:O},X="data:image/png;base64,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",Q=()=>{const r=t(G),c=t(z),s=t(Y),o=i();b.useEffect(()=>{o(y())},[o]);const h=r==null?void 0:r.dollar.rateBuy.toFixed(2),u=r==null?void 0:r.dollar.rateSell.toFixed(2),N=r==null?void 0:r.euro.rateBuy.toFixed(2),A=r==null?void 0:r.euro.rateSell.toFixed(2);return e.jsxs("div",{className:a.currency_wrapper,children:[c&&e.jsx("p",{children:"Loading..."}),s&&e.jsxs("p",{children:["Error: ",s]}),!c&&!s&&r&&e.jsxs("div",{className:a.currency_table,children:[e.jsxs("ul",{className:a.currency_table_head,children:[e.jsx("li",{className:a.currency_item,children:"Currency"}),e.jsx("li",{className:a.currency_item,children:"Purchase"}),e.jsx("li",{className:a.currency_item,children:"Sale"})]}),e.jsxs("ul",{className:a.table_body,children:[e.jsxs("li",{className:a.currency_tr,children:[e.jsx("p",{className:a.currency,children:"USD"}),e.jsx("p",{className:a.currency,children:h}),e.jsx("p",{className:a.currency,children:u})]}),e.jsxs("li",{className:a.currency_tr,children:[e.jsx("p",{className:a.currency,children:"EUR"}),e.jsx("p",{className:a.currency,children:N}),e.jsx("p",{className:a.currency,children:A})]})]})]}),e.jsx("img",{src:X,alt:"Currency"})]})},S=()=>e.jsxs("div",{className:l.dashboardContainer,children:[e.jsx("div",{children:e.jsx(C,{})}),e.jsxs("div",{children:[e.jsx("div",{children:e.jsx(d,{})}),e.jsx("div",{children:e.jsx(Q,{})})]})]});export{S as default};
