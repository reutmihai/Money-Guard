import{u as x,a as j,b as l,j as a,h as g}from"./index-B3QVbpa6.js";import{c as N,a as o,F as b,b as v,d as n,E as t}from"./index.esm-CLpimr85.js";const L=()=>{const c=x(),s=j(),i=l(e=>e.auth.isLoading),r=l(e=>e.auth.error),d={email:"",password:""},m=N({email:o().email("Adresa de email este invalidă").required("Email-ul este obligatoriu"),password:o().required("Parola este obligatorie")}),u=async(e,{setSubmitting:h,setErrors:p})=>{try{await c(g(e)).unwrap(),s("/Money-Guard/dashboard",{replace:!0})}catch{p({email:"Email sau parolă incorectă"})}finally{h(!1)}};return a.jsx("div",{className:"login-container",children:a.jsxs("div",{className:"login-card",children:[a.jsx("h2",{children:"Log In"}),a.jsx(b,{initialValues:d,validationSchema:m,onSubmit:u,children:({isSubmitting:e})=>a.jsxs(v,{children:[a.jsxs("div",{className:"input-container",children:[a.jsx("label",{htmlFor:"email",children:a.jsx("i",{className:"fa fa-envelope"})}),a.jsxs("div",{className:"column",children:[a.jsx(n,{type:"email",name:"email",id:"email",placeholder:"E-mail",className:"login-input"}),a.jsx(t,{name:"email",component:"div",className:"error"})]})]}),a.jsxs("div",{className:"input-container",children:[a.jsx("label",{htmlFor:"password",children:a.jsx("i",{className:"fa fa-lock"})}),a.jsxs("div",{className:"column",children:[a.jsx(n,{type:"password",name:"password",id:"password",placeholder:"Password",className:"login-input"}),a.jsx(t,{name:"password",component:"div",className:"error"})]})]}),r&&a.jsx("div",{className:"error-message",children:r}),a.jsx("button",{type:"submit",disabled:e||i,className:"login-button",children:e||i?"Loading...":"Log In"}),a.jsx("button",{type:"button",className:"register-button",onClick:()=>s("/Money-Guard/register"),children:"Register"})]})})]})})};export{L as default};