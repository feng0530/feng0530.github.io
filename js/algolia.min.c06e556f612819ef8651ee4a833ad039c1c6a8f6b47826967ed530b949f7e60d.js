document.addEventListener("DOMContentLoaded",function(){const n=function(){const e=instantsearch({indexName:"algolia",searchClient:algoliasearch("Y68VT16ZWI","fe4fd21b7ac9972a70f8e470ca1d3208")});e.addWidgets([instantsearch.widgets.searchBox({container:"#searchbox",placeholder:"搜尋內容..."}),instantsearch.widgets.hits({container:"#hits",templates:{item:e=>{let n=e.url,s=e._highlightResult.title.matchedWords.join(","),t="";return e.tags.forEach((e)=>{t+=`<p class="tag">#${e}</p>`}),`
                            <a href="${n}" class="algolia-hit-item-link js-algolia-search-result" data-search-keyword="${s}">
                                ${e._highlightResult.title.value}
                                <p>${e.description}</p>
                                ${t}
                            </a>
                        `},empty:e=>`
                            <div class="hit-item">
                                <h3>找不到相關內容....</h3>
                            </div>
                        `,cssClasses:{item:"algolia-hit-item"}}}),instantsearch.widgets.configure({hitsPerPage:5}),instantsearch.widgets.pagination({container:"#pagination"})]),e.start()},e=document.getElementById("searchModal"),s=document.getElementById("openModalBtn"),o=document.getElementById("closeModalBtn");let t=!1;s.addEventListener("click",()=>{e.style.display="block",t||(n(),t=!0)}),o.addEventListener("click",()=>{e.style.display="none"}),window.addEventListener("click",t=>{t.target===e&&(e.style.display="none")})})