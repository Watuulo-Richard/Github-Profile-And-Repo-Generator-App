const searchInputElement = document.getElementById('searchInput')
const searchBtnElement = document.getElementById('searchBtn')
const githubProfileCardContainer = document.querySelector('.github-profile-card')
const reposContainer = document.querySelector('.repos')

async function getUser(user) {
    const response = await fetch(`https://api.github.com/users/${user}`)
    const fetchedUser = await response.json()
    // console.log(fetchedUser)
    return fetchedUser
}
getUser()

async function repos(user){
    const response = await fetch(`https://api.github.com/users/${user}/repos`);
    const reposData = await response.json()
    return reposData
}
repos('watuulo-richard')

async function displayingUserReposOnUI() {
    const reposData = await repos(searchInputElement.value)
    console.log(reposData)
    reposContainer.innerHTML = reposData.map((singleRepo)=>{
        return `
            <div class="repo-card">
                <div class="min-heading">
                    ${singleRepo.name}
                </div>
                <div class="repo-link">
                    <a href="${singleRepo.html_url}" target='_bank' class="repo-btn">Check Out This Repo...<i class="fa-solid fa-face-smile-beam fa-flip"></i></a>
                </div>
            </div>
        `
    }).join('')
}

searchBtnElement.addEventListener('click', async ()=>{
    const inputValue = searchInputElement.value
    const searchResult = await getUser(inputValue)
    console.log(searchResult)
    displayingUserReposOnUI()
    if(!searchResult){
        alert('User Not Found, Please Try To Search Again...')
    }
    else{
        githubProfileCardContainer.innerHTML = `
            <div class="profile-image-container">
                <img src="${searchResult.avatar_url}" alt="">
            </div>
            <hr class="border-line">
            <div class="profile-card-text">
                <div class="info-heading">
                    <h3>${searchResult.name}</h3>
                    <p>${searchResult.login}</p>
                </div>
                <div class="follow-info">
                    <div class="single">
                        <span>${searchResult.followers}</span>
                        <p>Followers</p>
                    </div>
                    <div class="single">
                        <span>${searchResult.following}</span>
                        <p>Following</p>
                    </div>
                    <div class="single">
                        <span>${searchResult.public_repos}</span>
                        <p>Repos</p>
                    </div>
                </div>
                <a href="${searchResult.html_url}" target='_bank' class="visit-link">Visit Github Profile</a>
            </div>
        `
    }
})