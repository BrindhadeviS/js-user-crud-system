
// console.log(window.location.search);

const idParams = new URLSearchParams(window.location.search);
// console.log(idParams.get("id")); 
let userIdFromUrl = idParams.get("id");


//! Access the users array
const fetchUsers = async ()=> {
    const response = await fetch("http://localhost:500/users");
    const userData = await response.json();
    
    //? accessing single user data
    let currentUserData = userData.find((user)=> {
        return Number(user.userId) === Number(userIdFromUrl);
    });

    const allIds = [
    "profileURL",
    "sidebarName",
    "sidebarDesignation",
    "userId",
    "firstName",
    "lastName",
    "dob",
    "gender",
    "designation",
    "experience",
    "phone",
    "address",
  ];

  allIds.map((elementId) => {
    if (elementId === "profileURL") {
      document.getElementById(elementId).src = currentUserData.profileURL;
    } else if (elementId === "sidebarName") {
      document.getElementById(elementId).textContent =
        `${currentUserData.firstName} ${currentUserData.lastName}`;
    } else if (elementId === "sidebarDesignation") {
      document.getElementById(elementId).textContent =
        currentUserData.designation;
    } else {
      document.getElementById(elementId).textContent =
        currentUserData[elementId];
    }
  });


    function getUserIdName(name, id){
        window.location.href = `userForm.html?name=${name}&id=${id}`
    }

    document.getElementById("updateBtn").addEventListener("click", ()=> {
        getUserIdName(currentUserData.firstName, currentUserData.userId);
    })

    
  //! Delete User Logic
  document.getElementById("btnDelete").addEventListener("click", async () => {
    // 1. Send DELETE request to json-server using the internal database record id
    await fetch(`http://localhost:500/users/${currentUserData.id}`, {
      method: "DELETE",
    });

    // 2. Alert the user
    console.log("User Deleted Successfully❌");

    // 2. Small delay to let json-server finish, then redirect smoothly
    window.location.href = "home.html";
  });

}

fetchUsers()

document.getElementById("btnBack").addEventListener("click", ()=> {
    window.location.href = "./home.html";
})
