var g=Object.defineProperty,j=Object.defineProperties;var x=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var E=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var m=(t,e,r)=>e in t?g(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,u=(t,e)=>{for(var r in e||(e={}))E.call(e,r)&&m(t,r,e[r]);if(d)for(var r of d(e))C.call(e,r)&&m(t,r,e[r]);return t},p=(t,e)=>j(t,x(e));var b=(t,e)=>()=>(t&&(e=t(t=0)),e);function o(t){return new Promise(e=>{let r=window.requestIdleCallback||window.requestAnimationFrame,s=()=>e(t&&t());r?r(s):setTimeout(s,100)})}function l(t){return(t||"").toLowerCase().replaceAll(/\s/g,"-")}var _FetchElement,k,y=b(()=>{_FetchElement=class extends HTMLElement{static get observedAttributes(){return["src","method","headers","state","status","error","skiprender"]}static get mime2mod(){return{"application/json":async()=>(await Promise.resolve().then(()=>(T(),v))).default,"text/html":()=>_FetchElement.prototype.renderHtml,"text/xml":()=>_FetchElement.prototype.renderHtml,"application/xml":()=>_FetchElement.prototype.renderHtml,"image/svg+xml":()=>_FetchElement.prototype.renderHtml}}get headers(){return{}}abort(){}fetch(...t){return this._fetch(...t)}constructor(){super();let t=Promise.resolve(),e=new AbortController,{signal:r}=e;this.abort=()=>e.abort(),this._fetch=async(s,n)=>{this.state="loading",this.status="";let a=p(u({method:this.getAttribute("method")||"GET",headers:this.headers},n),{signal:r});return t=new Promise(async(i,c)=>{try{let h=await fetch(s,a),f=await this.onResponse(h),w=await this.onResult(f);this.error?c(this.error):i(w)}catch(h){c(this.onError(h))}})},Object.defineProperty(this,"promise",{get(){return t}}),_FetchElement.observedAttributes.filter(s=>s!=="headers").forEach(s=>Object.defineProperty(this,s,{get:()=>this.getAttribute(s),set:n=>this.setAttribute(s,n)}))}connectedCallback(){this.src&&this.fetch(this.src),this.initialized=!0}attributeChangedCallback(name,oldValue,newValue){switch(name){case"headers":this[name]=eval(newValue);break;case"src":this.initialized&&this.fetch(newValue);break;default:this[name]!==newValue&&(this[name]=newValue)}}async onResponse(t){let e=1*(this.status=t.status);return(e<200||e>=300)&&(this.error="network error"),this.contentType=t.headers.get("content-type"),this.responseHeaders=t.headers,this.contentType.includes("json")?t.json():t.text()}setContent(t){this.innerHTML=t}async onResult(t){try{if(this.hasAttribute("skiprender"))return;let e=await this.constructor.mime2mod[this.contentType.split(";")[0]]();return typeof e=="string"&&(e=(await import(e)).default),this.state="rendering",(e||this.render).call(this,t,this.contentType,this.status,this.responseHeaders)}finally{this.state="loaded"}}render(t,e,r,s){}async renderHtml(t,e,r,s){this.setContent(t),await o(),this.render(...arguments),await o()}onError(t){return this.state="error",t}getKeys(t){return Object.keys(t)}},k=_FetchElement;window.customElements.define("fetch-element",_FetchElement)});async function A(t,e,r,s){await o();let n=this.render(t,e,r,s);this.json2table||(this.json2table=H),this.setContent(n||this.json2table(t,[])),await o()}function H(t,e){if(Array.isArray(t)){if(!t.length)return"";let s=this.getKeys(t[0]);return`
<table>
    <tr>${s.map(n=>`<th>${n}</th>`).join(`
`)}</tr>
    ${t.map((n,a)=>`
    <tr>${s.map(i=>`
        <td key="${l(i)}">
            ${this.json2table(n[i],[...e,a,i])}
        </td>`).join("")}
    </tr>`).join(`
`)}
</table>
`}return typeof t!="object"||t===null?t:`
<table>
    ${this.getKeys(t).map(s=>`
<tr><th>${s}</th>
    <td key="${l(s)}">${this.json2table(t[s],[...e,s])}</td>
</tr>`).join("")}
</table>
`}var T=b(()=>{y()});T();export{A as default,H as json2table};
//# sourceMappingURL=json.js.map
