import{i as u,S as h,a as y}from"./assets/vendor-D9tHNiur.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();function b(i,s){let{hits:n}=i;const r=document.querySelector(".gallery");if(!n||n.length===0){u.show({messageColor:"#fafafb",messageSize:"16px",backgroundColor:"#ef4040",transitionIn:"bounceInLeft",position:"topRight",closeOnClick:!0,message:"Sorry, there are no images matching your search query. Please try again!"}),r.innerHTML="";return}const e=n.map(o=>` <li class="gallery-item">
        <a class="gallery-link" href="${o.largeImageURL}">
            <img class="gallery-img" src="${o.webformatURL}" alt="${o.tags}">
            <div class="gallery-div">
                <p>Likes</p>
                <p>Views</p>
                <p>Comments</p>
                <p>Downloads</p>
                <span>${o.likes}</span>
                <span>${o.views}</span>
                <span>${o.comments}</span>
                <span>${o.downloads}</span>
            </div>
        </a>
    </li>`).join(" ");s?r.innerHTML=e:r.insertAdjacentHTML("beforeend",e),new h(".gallery a",{captionsData:"alt",captionDelay:250}).refresh();const{height:a}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})}const L="49077241-9df32fcc53d001f958141ccb6",p=40;let c=1,m="";async function g(i,s=!1){const n=document.querySelector(".gallery"),r=document.querySelector(".load-more");s&&(c=1,m=i,n.innerHTML="");const e=encodeURIComponent(m),a=`https://pixabay.com/api/?${new URLSearchParams({key:L,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:c,per_page:p})}`;try{const d=(await y.get(a)).data;if(d.hits.length===0)throw new Error("No images found");b(d,s),c++,c*p>=d.totalHits?(r.classList.add("hidden"),u.show({messageColor:"#fafafb",messageSize:"16px",backgroundColor:"#ef4040",transitionIn:"bounceInLeft",position:"topRight",closeOnClick:!0,message:"We're sorry, but you've reached the end of search results."})):r.classList.remove("hidden")}catch(o){console.error(o),n.innerHTML="",u.show({messageColor:"#fafafb",messageSize:"16px",backgroundColor:"#ef4040",transitionIn:"bounceInLeft",position:"topRight",closeOnClick:!0,message:"Sorry, an error happened. Try again"})}}const w=document.querySelector(".input-list"),f=document.querySelector(".load-more"),S=document.querySelector(".input");let l="";f.classList.add("hidden");w.addEventListener("submit",async i=>{if(i.preventDefault(),l=S.value.trim(),!l){u.show({messageColor:"#fafafb",messageSize:"16px",backgroundColor:"#ef4040",transitionIn:"bounceInLeft",position:"topRight",closeOnClick:!0,message:"Please enter the search query"});return}f.classList.add("hidden"),await g(l,!0)});f.addEventListener("click",async()=>{await g(l,!1)});
//# sourceMappingURL=index.js.map
