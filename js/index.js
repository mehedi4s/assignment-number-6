const loadData = async (searchText=[]) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json()
    displayData(data.posts)
}

const displayData = (datas) => {
    const displayCard = document.getElementById('display-card')
    displayCard.innerHTML = '';
    displayLoadingSpinner(false)
    
    datas.forEach(data => {

        const cardDiv = document.createElement('div');
        cardDiv.classList = `p-10 bg-[#F3F3F5] rounded-3xl`
        cardDiv.innerHTML = `
        <div class="flex gap-6">
                            <!-- img -->
                            <div class="indicator">
                                <span class="indicator-item badge ${data.isActive? 'bg-green-500': 'bg-red-500'} "></span> 
                                <img class="w-[72px] h-[72px]" src=${data.image} alt="">
                            </div>
                            <!-- text -->
                            <div id="card-show">
                                <div class="space-x-3 lg:space-x-6">
                                    <span># ${data.category}</span>
                                    <span>Author : ${data.author.name} </span>
                                </div>
                                <h1 class="my-4 text-xl font-bold">${data.title}</h1>
                                <p>${data.description}</p>
                                <hr style="border: 1px dashed; opacity: 30%" class="my-6" />
                                <div class="flex justify-between gap-3">
                                    <div class="flex space-x-3 lg:space-x-7">
                                        <h1 class="flex items-center gap-1 lg:gap-5"><img src="images/Group 13.png" alt=""><span>${data.comment_count}</span></h1>
                                        <h1 class="flex items-center gap-1 lg:gap-5"><img src="images/Group 16.png" alt=""><span>${data.view_count}</span></h1>
                                        <h1 class="flex items-center gap-1 lg:gap-5"><img src="images/clock.png" alt=""><span>${data.posted_time} min</span></h1>
                                    </div>
                                    <div>
                                        <button onclick='showTitleView("${data.title.replace(/'/g, "@")}", "${data.view_count}")'><img src="images/Group 40106.png" alt=""></button>
                                    </div>
                                </div>
                            </div>
                        </div>
        `
       
        displayCard.appendChild(cardDiv);
        
    });
    // spin stop karon data akane display te show kortace
    
}

// handle search button

const handleSearch = () => {
    displayLoadingSpinner(true);
    const searchBox = document.getElementById('search-box')
    const searchText = searchBox.value;
    if(searchText){
        setTimeout(() => {
            loadData(searchText)
        }, 2000)
    
    } else{
        alert('search right keywoard')
    }
    
}


// loading spinner

const displayLoadingSpinner = (isSpin) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isSpin) {
        loadingSpinner.classList.remove('hidden')
    }else {
        loadingSpinner.classList.add('hidden')
    }
    
    
}

loadData()

const displayTitleView = document.getElementById('show-title-view')
const showTitleView = (getTitle, getViewCount) => {
    // console.log(getTitle);
    const showCount = getElementById('count-value')
    const updateCount = showCount + 1;
    console.log(updateCount)
    setElementByValue('count-value', updateCount)


    const div = document.createElement('div')
    div.classList = `bg-white rounded-2xl shadow-xl`
    div.innerHTML = `
    <div class="p-4 flex">
    <h1 class="w-[75%]">${getTitle}</h1>
    <h1 class="w-[25%] flex items-center gap-1 lg:gap-5"><img src="images/Group 16.png" alt=""><span>${getViewCount}</span></h1>
   </div>
    `
    displayTitleView.appendChild(div)
}




// latest post

const latestPost = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json()
   latestPostDisplay(data)
}

const latestPostDisplay = (post) => {
    const latestPost = document.getElementById('latest-post')
    post.forEach(item => {
        // console.log(item)
        const latestDiv = document.createElement('div')
        latestDiv.classList = 'lg:flex lg:gap-7 space-y-5'
        latestDiv.innerHTML = `
                    <div class="card  bg-base-100 shadow-xl">
                        <figure class="px-10 pt-10">
                          <img src="${item.cover_image}" alt="Shoes" class="rounded-xl" />
                        </figure>
                        <div class="card-body">
                            <p class="flex gap-5 mb-4 text-[#12132D99]"><img src="images/Frame.png" alt="">${item.author.posted_date? item.author.posted_date : 'No publish date'}</p>
                          <h2 class=" font-extrabold">${item.title}</h2>
                          <p class="text-[#12132D99]">${item.description}</p>
                          <div class="card-actions flex gap-5 mt-4">
                            <div>
                                <img class="w-[44px] h-[44px] rounded-full" src="${item.profile_image}" alt="">
                            </div>
                            <div>
                                <h1>${item.author.name}</h1>
                                <p class="text-[#12132D99] text-[14px]">${item.author.designation? item.author.designation :'Unknown'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
        `
        latestPost.appendChild(latestDiv)
    })
}

// search btn


latestPost()