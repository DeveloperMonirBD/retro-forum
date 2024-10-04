const loadAllPosts = async (category) => {
    // console.log(`https://openapi.programming-hero.com/api/retro-forum/posts${category ? `?category=${category}` : ''}`);

    document.getElementById("post-container").innerHTML = ""
    const response = await fetch(
        `https://openapi.programming-hero.com/api/retro-forum/posts${
            category ? `?category=${category}` : ""
        }`
    );
    const data = await response.json();
    displayAllPost(data.posts);
};

const displayAllPost = (posts) => {
    const postContainer = document.getElementById("post-container");
    posts.forEach((e) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="p-7 lg:12 flex gap-6 lg:flex-row flex-col items-center lg:items-start bg-[#f3f3f5] rounded-3xl">

              <!-- img section  -->
              <div class="indicator">
                <span class="indicator-item badge ${
                    e.isActive ? "bg-green-600" : "bg-red-500"
                }"></span>
                <div class="avatar">
                  <div class="w-24 rounded-xl">
                    <img src="${e.image}" alt="">
                  </div>
                </div>
              </div>

              <div class="space-y-4 w-full">
                <!-- category  -->
                <div class="flex gap-4 *:opacity-60">
                  <p># Category</p>
                  <p>Author: ${e.author.name}</p>
                </div>

                <h3 class="text-2xl font-bold opacity-70">${e.title}</h3>
                <p class="opacity-40">${e.description}</p>

                <hr class="border border-dashed border-gray-300">

                <div class="flex justify-between *:font-bold [&>*:not(:last-child)]:opacity-45">
                  <div class="flex gap-4">
                    <!-- comment count  -->
                    <div class="space-x-2 flex items-center">
                      <i class="fa-regular fa-comment-dots"></i>
                      <p>${e.comment_count}</p>
                    </div>

                    <!-- view  -->
                    <div class="space-x-2 flex items-center">
                      <i class="fa-regular fa-eye"></i>
                      <p>${e.view_count}</p>
                    </div>

                    <!-- clock  -->
                    <div class="space-x-2 flex items-center">
                      <i class="fa-regular fa-clock"></i>
                      <p>${e.posted_time}</p>
                    </div>
                  </div>

                  <!-- envelop btn  -->
                  <div class="opacity-100">
                    <button id="addToList" onclick="markAsRead('${
                        e.description
                    }', '${
            e.view_count
        }' )" class="addToList btn btn-circle bg-green-500 btn-sm" >
                      <i class="fa-solid fa-envelope-open text-white"></i>
                    </button>
                  </div>

                </div>
              </div>
            </div>
        `;
        postContainer.appendChild(div);
    });
};

// ** markAsRead
const markAsRead = (description, view_count) => {
    const markAsReadCounter = document.getElementById("markAsReadCounter");
    const markAsReadContainer = document.getElementById("markAsReadContainer");

    const div = document.createElement("div");
    div.innerHTML = `
    <div class="flex justify-between mb-4 p-2 lg:p-3 bg-white rounded-2xl items-center gap-3">
                  <p class = "py-4">${description}</p>
                  <p><i class="fa-regular fa-eye"></i> ${view_count}</p>
                 </div>

    `;
    markAsReadContainer.appendChild(div);

    handleCount();
};

// ** markAsRead counter
const handleCount = () => {
    const prevCount = document.getElementById("markAsReadCounter").innerText;
    const convertedCounter = parseInt(prevCount);
    const sum = convertedCounter + 1;
    document.getElementById("markAsReadCounter").innerText = sum
}

loadAllPosts();

// ** search input:
const handleSearchByCategory = () => {
    const searchText = document.getElementById("searchPosts").value;
    loadAllPosts(searchText);
};
