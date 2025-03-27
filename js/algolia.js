document.addEventListener('DOMContentLoaded', function () {
    // 初始化 instantsearch
    const searchInit = function () {
        const search = instantsearch({
            indexName: 'algolia', // 替換為你的索引名稱
            searchClient: algoliasearch('Y68VT16ZWI', 'fe4fd21b7ac9972a70f8e470ca1d3208')
        });

        search.addWidgets([
            // 添加搜尋框
            instantsearch.widgets.searchBox({
                container: '#searchbox',
                placeholder: '搜尋內容...',
            }),
            // 添加搜尋結果
            instantsearch.widgets.hits({
                container: '#hits',
                templates: {
                    item: (data) => {
                        let link = data.url;
                        let keywords = data._highlightResult.title.matchedWords.join(",");
                        let tags = "";
                        data.tags.forEach((item, index) => {
                            tags += `<p class="tag">#${item}</p>`;
                        })
                        return `
                            <a href="${link}" class="algolia-hit-item-link js-algolia-search-result" data-search-keyword="${keywords}">
                                ${data._highlightResult.title.value}
                                <p>${data.description}</p>
                                ${tags}
                            </a>
                        `;
                    },
                    empty: data => {
                        return `
                            <div class="hit-item">
                                <h3>找不到相關內容....</h3>
                            </div>
                        `;
                    },
                    cssClasses: {
                        item: 'algolia-hit-item'
                    }
                },
                // templates: {
                //     item: `
                //         <div class="hit-item">
                //             <h3>{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</h3>
                //         </div>
                //     `,
                //     empty: `
                //         <div class="hit-item">
                //             <h3 style="text-align: center;">找不到相關內容....</h3>
                //         </div>
                //     `
                // },
            }),
            // 設定分頁顯示的筆數
            instantsearch.widgets.configure({
                hitsPerPage: 4,
            }),
            // 添加分頁
            instantsearch.widgets.pagination({
                container: '#pagination',
            })
        ]);

        // 啟動搜尋
        search.start();
    }

    // 處理彈出視窗的顯示與隱藏
    const modal = document.getElementById('searchModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    let isSearchStarted = false;

    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';

        // 只有在第一次打開視窗時初始化並啟動搜尋
        if (!isSearchStarted) {
            searchInit();
            isSearchStarted = true;
        }
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 點擊視窗外部關閉
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
})