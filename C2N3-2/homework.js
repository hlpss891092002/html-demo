const BASE_URL = "https://user-list.alphacamp.io"
const INDEX_URL = BASE_URL + "/api/v1/users/"



const dataPanel = document.querySelector('#data-panel')

const userData = []

//插入入HTML
function loadUserData(userData) {
  let rawHTML = ''
  userData.forEach((item) => {
    rawHTML += `
    <div class="card" data-bs-toggle="modal" data-bs-target="#user-modal" data-user-id="${item.id}" style="width: 10rem;">
      <img src="${item.avatar}" class="card-img-top user-Avatar" data-user-id="${item.id}" alt="...">
      <div class="card-body" data-user-id="${item.id}">
        <p class="card-text" data-user-id="${item.id}"> ${item.name}</p>
      </div>
    </div>
  `
  });
  dataPanel.innerHTML = rawHTML
}

//modal


function showMoreUserData(event) {
  // 選取節點
  dataPanel.addEventListener('click', function clickAvatar(event) {
    const id = event.target.dataset.userId
    console.log(id)
    const userName = document.querySelector('#user-name')
    const userAvatar = document.querySelector('#user-avatar')
    const userInfo = document.querySelector('#user-info')

    userName.innerHTML = ''
    userAvatar.src = ''
    userInfo.textContent = ''

    axios.get(INDEX_URL + id).then(response => {
      console.log(response.data)
      const data = response.data
      userName.innerHTML = data.name
      userAvatar.src = data.avatar
      userInfo.innerHTML = `
      <ul>
       <li>email: ${data.email}</li>
      <li>gender: ${data.gender}</li>
      <li>age: ${data.age}</li>
      <li>region: ${data.region}</li>
      <li>birthday: ${data.birthday}</li>
      </ul>
      `
    })
  })

}
showMoreUserData()
// 監聽器

//取得使用者資料
axios.get(INDEX_URL).then(function (response) {
  // console.log(response.data.results)
  userData.push(...response.data.results)
  // console.log(userData)
  loadUserData(userData)
})