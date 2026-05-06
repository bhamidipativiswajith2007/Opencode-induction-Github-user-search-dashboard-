
/* ===================== ADDED: DEBOUNCE SETUP ===================== */
let debounceTimer;
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.trim();
if (value === "") {
    clearTimeout(debounceTimer);
    return;
  }
clearTimeout(debounceTimer);
debounceTimer = setTimeout(() => {
    startSearch();
  }, 600);
});

/* ===================== END DEBOUNCE ===================== */

document.getElementById("form").addEventListener("submit",
 (e)=>{ 
    e.preventDefault();
    startSearch();
 }
)

let currentPage = 1;
let perPage = 12;
let currentQuery = "";

// Start Search
function startSearch() {
  currentQuery = document.getElementById("searchInput").value;

  if (currentQuery.trim() === "") {
    alert("Enter a username");
    return;
  }
  let para=document.getElementById("users");
  if(currentQuery==="vissu"){
      para.innerHTML="saramyaa mee dadddy alaney cheptharru girl..kani nenu ela ayina baaga chaduvtha ninnu baaa chadivista ..nuvvu elano baaga chaduvuthav girll ...manch job vastundhi neeku naadhi guarentee...nenu job avi baaga set avvaganey..mee intlo vachi adugutha girl ..elagaina ...ala adaagaganey mee daddy emi love ni theesi paderu..neeku ihstam kada nenu .bee strong on that..we will work hard girl..em kaadhu nenu unna .,.nenu edokati chesta..baaga sampadista...machi family aa maadhi ..adigtha neney vachi nuvvu heppaka mundharey..so please..nanna maatalu valla stress teesukoku girl..em kaadhu ..baa chadivi eela ayina i will impress yoyr father and mother..as i am a brahmin..no one will instantly reject me ..they will consider my reuest..so please stay strong..on our decision ..idhi mana life saramya.we have the right to make the decision so ..please..okatey alochinchu nuvvu ..neeku nenu saripothana leda..ninnu baa choosukuntana leda..same vice versa..nuvvu naku chaalu ee life ki..i am so happy that i found you..so naakku nuvvu idhi antha chadivaka cheppu insta lo sare na ..i love ypu girl ..nuvvu lekunda nenu undalenu..i know that ssame applies to u ..so baaga chaduvukundham..manam elagaina..nenu unna ..pelli antha neney choosukunta..nuvvu stress teesukoku ..manchidhi kaadhu neeku ";  
    return;
    }

  currentPage = 1;

  /* ===================== ADDED: LOCALSTORAGE SAVE ===================== */
  localStorage.setItem("githubQuery", currentQuery);
  localStorage.setItem("githubPage", currentPage);
  /* ===================== END LOCALSTORAGE SAVE ===================== */

  fetchUsers();
}

// Fetch Users
async function fetchUsers() {
  const status = document.getElementById("status");
  status.innerText = "Loading...";

  try {
    const url = `https://api.github.com/search/users?q=${encodeURIComponent(currentQuery)}&page=${currentPage}&per_page=${perPage}`;

    let num=`https://api.github.com/search/users?q=${encodeURIComponent(currentQuery)}`
    fetch(num)
    .then((response)=>{
      return response.json()
    }).then((data)=>{
      console.log(data.total_count)
    })

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (!response.ok) {
      throw new Error("API Error");
    }

    const data = await response.json();
    displayUsers(data.items);

    status.innerText = "";
    let pagenum=document.getElementById("pageNum");
    pagenum.innerText =`${currentPage}/${Math.ceil(data.total_count/perPage)}`;
    pagenum.className="pagenum";

  } catch (error) {
    console.error(error);
    status.innerText = "Something went wrong!";
  }
}

// Display Users
function displayUsers(users) {
  const container = document.getElementById("users");
  container.innerHTML = "";

  if (users.length === 0) {
    container.innerHTML = "<p>No users found</p>";
    return;
  }


  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${user.avatar_url}">
      <h3>${user.login}</h3>
      <a href="${user.html_url}" target="_blank">View Profile</a>
    `;

    container.appendChild(card);
  });
}

// Next Page
function nextPage() {
  currentPage++;

  /* ===================== ADDED: SAVE PAGE ===================== */
  localStorage.setItem("githubPage", currentPage);
  /* ===================== END SAVE PAGE ===================== */

  fetchUsers();
}

// Prev Page
function prevPage() {
  if (currentPage > 1) {
    currentPage--;

    /* ===================== ADDED: SAVE PAGE ===================== */
    localStorage.setItem("githubPage", currentPage);
    /* ===================== END SAVE PAGE ===================== */

    fetchUsers();
  }
}

/* ===================== ADDED: RESTORE FROM LOCALSTORAGE ===================== */
window.addEventListener("load", () => {
  const savedQuery = localStorage.getItem("githubQuery");
  const savedPage = localStorage.getItem("githubPage");

  if (savedQuery) {
    document.getElementById("searchInput").value = savedQuery;
    currentQuery = savedQuery;
    currentPage = savedPage ? Number(savedPage) : 1;
    fetchUsers();
  }
});
/* ===================== END RESTORE ===================== */
