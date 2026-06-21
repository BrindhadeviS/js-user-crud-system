

const userForm = document.getElementById("user-form");

 const firstName = document.getElementById("firstName");
    
    const lastName = document.getElementById("lastName");
    const dob = document.getElementById("dob");
    const gender = document.getElementById("gender");
    const designation = document.getElementById("designation");
    const experience = document.getElementById("experience");
    const phone = document.getElementById("phone");
    const profileURL = document.getElementById("profileURL");
    const address = document.getElementById("address");
    
    const submitBtn = document.getElementById("submitBtn");
    

//* fetch current data 
const idParams = new URLSearchParams(window.location.search);
// console.log(idParams.get("id")); 
let userIdFromUrl = idParams.get("id");
let dbId;

//! Update User
if(userIdFromUrl){

    let updateUser = (e)=> {

       e.preventDefault(); 
    //! Access the users array
    console.log(userIdFromUrl);
          
    let payload = {
        userId : userIdFromUrl ,
        firstName : firstName.value,
        lastName : lastName.value,
        dob : dob.value,
        gender : gender.value,
        designation : designation.value,
        experience : experience.value,
        phone : phone.value,
        profileURL : profileURL.value,
        address : address.value,
    };
    console.log("Pay load :", payload );
    
    
    fetch(`http://localhost:500/users/${dbId}`, {
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(payload),
    }).then(() => {
    console.log("Update successful");

    alert("User Updated");

    console.log("before");
    
    setTimeout(() => {
        console.log("Redirecting...");
        window.location.href = "./home.html";
    });
});
    
    }
    

const fetchUsers = async ()=> {
        const response = await fetch("http://localhost:500/users");
        const userData = await response.json();
        
        console.log(userData);
        
        
        //? accessing single user data
        let currentUserData = userData.find((user)=> {
            return Number(user.userId) === Number(userIdFromUrl);
        })
        
        if (!currentUserData) {
            console.log("User not found");
            return;
        }
        console.log(currentUserData);
        
        dbId = currentUserData.id;
        
        const allIds = [
        "profileURL",
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
          document.getElementById(elementId).value =
            currentUserData[elementId];
      });

   }

   fetchUsers();
    submitBtn.textContent = "Update User Data";

    userForm.addEventListener("submit", updateUser);
    
}

//! Add User
else{


const createUser = (e)=> {
    e.preventDefault();
   
    //! logic for random id
    const userId = Math.floor(Math.random() * 9999 + 1000);
    console.log(userId);
    

    let payload = {
        userId : userId,
        firstName : firstName.value,
        lastName : lastName.value,
        dob : dob.value,
        gender : gender.value,
        designation : designation.value,
        experience : experience.value,
        phone : phone.value,
        profileURL : profileURL.value,
        address : address.value,
    };
    console.log("Pay load :", payload );
    
    fetch(`http://localhost:500/users`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
}).then(() => {
    alert("User Created");

    setTimeout(() => {
        window.location.href = "./home.html";
    }); // wait 1 second
});

    
}

userForm.addEventListener("submit", createUser);

}