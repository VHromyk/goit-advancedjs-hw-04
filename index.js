import{a as v,S,i as q}from"./assets/vendor-CesYmgD5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();async function p({query:r,page:o}){return(await v.get("https://pixabay.com/api/",{params:{key:"19790179-de8e0f050de34d9c55fd8172a",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}})).data}const y=document.querySelector(".gallery"),h=document.querySelector(".loader"),m=document.querySelector(".load-more-btn"),$=new S(".gallery a",{captionsData:"alt",captionDelay:250,fadeSpeed:300,overlayOpacity:.9,closeOnOverlayClick:!0,captions:!0});function g(r){const o=r.map(e=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${e.largeImageURL}">
            <img
              class="gallery-image"
              src="${e.webformatURL}"
              alt="${e.tags}"
              data-source="${e.largeImageURL}"
              data-tags="${e.tags}"
            />
          </a>
          <ul class="info-block">
            <li>
              <span>Likes</span>
              <span>${e.likes}</span>
            </li>
            <li>
              <span>Views</span>
              <span>${e.views}</span>
            </li>
            <li>
              <span>Comments</span>
              <span>${e.comments}</span>
            </li>
            <li>
              <span>Downloads</span>
              <span>${e.downloads}</span>
            </li>
          </ul>
        </li>
      `).join("");y.insertAdjacentHTML("beforeend",o),$.refresh()}function O(){y.innerHTML=""}function w(){h.classList.add("is-shown")}function L(){h.classList.remove("is-shown")}function b(){m.classList.remove("is-hidden")}function u(){m.classList.add("is-hidden")}const d=document.querySelector(".form"),B=document.querySelector(".load-more-btn");function n(r,o){q.show({color:o,message:r,position:"topRight"})}let i=1,f="",l=0;d.addEventListener("submit",async r=>{r.preventDefault();const e=new FormData(d).get("search-text").trim();if(e){f=e,d.reset(),i=1,l=0,O(),u(),w();try{const a=await p({query:f,page:i});if(a.hits.length===0){n("Sorry, there are no images matching your search query. Please try again!","yellow");return}g(a.hits),l+=a.hits.length,i+=1,l>=a.totalHits?(u(),n("We're sorry, but you've reached the end of search results.","yellow")):b()}catch(a){n(a.message,"red")}finally{L()}}});B.addEventListener("click",async()=>{u(),w();try{const r=await p({query:f,page:i}),{height:o}=document.querySelector(".gallery-item").getBoundingClientRect();g(r.hits),window.scrollBy({top:o*2,behavior:"smooth"}),l+=r.hits.length,i+=1,l>=r.totalHits?n("We're sorry, but you've reached the end of search results.","yellow"):b()}catch(r){n(r.message,"red")}finally{L()}});
//# sourceMappingURL=index.js.map
