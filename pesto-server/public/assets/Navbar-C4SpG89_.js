import{a as i,r as n,j as e,L as c}from"./index-Dx2hv2Bi.js";import{a as d,P as x,A as m,b as u,c as p,D as g}from"./index-C2GMCkPK.js";import{p as h}from"./index-BdMuK6WX.js";import{B as j,s as b}from"./index-CfUYSH4I.js";const f={small:"p-2",large:"p-4",medium:"p-3"},N=({children:t,size:o="medium",...s})=>e.jsx("div",{...s,className:p("bg-transparent hover:bg-[rgba(0,0,0,0.05)] rounded-[50%] transition-all duration-500",f[o]),children:t}),v=()=>{const{logoutUser:t}=i(),o=()=>{t(),b.success({message:"Logged out Successfully.",description:"You are now logged out successfully."})};return e.jsxs(e.Fragment,{children:[e.jsx(g,{}),e.jsx("div",{className:"w-[300px]",children:e.jsx(j,{onClick:o,type:"default",block:!0,children:"Logout"})})]})},a=({text:t,to:o})=>e.jsx(c,{to:o,className:"font-bold text-white px-3 py-2 bg-[#1A73E2] hover:bg-[#3688EE] rounded-[4px] transition-all duration-500",children:t}),w=()=>e.jsxs("div",{className:"flex gap-3 items-center",children:[e.jsx(a,{to:"/auth/login",text:"Login"}),e.jsx(a,{to:"/auth/register",text:"Register"})]}),k=({toggler:t=()=>{},showToggler:o=!1})=>{const{user:s,isLoggedIn:r}=i(),l=n.useMemo(()=>[(s==null?void 0:s.firstName.trim())||"",(s==null?void 0:s.lastName.trim())||""].join(" "),[s]);return e.jsxs("nav",{className:"h-[72px] w-full bg-white  border-solid border-[1px] border-[#e7e7e7] shadow-sm px-5 flex items-center justify-between",children:[o?e.jsx(N,{onClick:t,children:e.jsx(d,{size:20,fontWeight:"bold",color:"#19181a",className:"cursor-pointer"})}):e.jsx("div",{}),e.jsxs("div",{children:[r&&e.jsx(x,{content:e.jsx(v,{}),placement:"bottomRight",title:e.jsxs("div",{className:"flex flex-col gap-3 items-center pt-3",children:[e.jsx("div",{className:"flex border-solid border-[1px] border-[#e7e7e7] rounded-[50%] p-[1px]",children:e.jsx(m,{className:"bg-[#1A73E2] shadow-md",size:"large",children:s==null?void 0:s.firstName})}),e.jsx(h.Title,{level:4,children:l})]}),children:e.jsx(u,{size:38,fontWeight:700,color:"#19181a",className:"cursor-pointer"})}),!r&&e.jsx(w,{})]})]})};export{k as N};
