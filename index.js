import{i as l,S as m}from"./assets/vendor-Dg3uDB0e.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const f=r=>{const a=new URLSearchParams({key:"48729449-8dc77fb28ea9fafa38a1576eb",q:r});return fetch(`https://pixabay.com/api/?${a}&image_type=photo&orientation=horizontal&safesearch=true`).then(s=>{if(!s.ok)throw new Error(s.status);return s.json()})},h=r=>`<li class="gallery-card">
      <a href="${r.largeImageURL}" class="gallery-item">
        <img class="gallery-img" src="${r.webformatURL}" alt="${r.tags}" title="" loading="lazy" />
        <div class="gallery-info">
          <p>
            <span>Likes</span>
            <span>${r.likes}</span>
          </p>
          <p>
            <span>Views</span>
            <span>${r.views}</span>
          </p>
          <p>
            <span>Comments</span>
            <span>${r.comments}</span>
          </p>
          <p>
            <span>Downloads</span>
            <span>${r.downloads}</span>
          </p>
        </div>
      </a>
    </li>`,p=document.querySelector(".js-search-form"),c=document.querySelector(".js-gallery"),d=document.querySelector(".loader");let i;const y=r=>{r.preventDefault(),g();const a=r.currentTarget.elements.user_query.value.trim();if(a===""){u(),l.error({title:"Error!",message:"Please enter a search term!"});return}f(a).then(s=>{if(s.hits.length===0){l.error({title:"Error!",message:"Sorry, no images found for your search query."}),c.innerHTML="",p.reset();return}const o=s.hits.map(e=>h(e)).join("");c.innerHTML=o,i?i.refresh():i=new m(".gallery a",{captionsData:"alt",captionDelay:250})}).catch(s=>{l.error({title:"Error!",message:"Something went wrong. Please try again later."}),console.error(s)}).finally(()=>u())},g=()=>d.classList.remove("is-hidden"),u=()=>d.classList.add("is-hidden");p.addEventListener("submit",y);
//# sourceMappingURL=index.js.map
