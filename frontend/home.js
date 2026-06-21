//! logic to fetch all users

//!  redirect function for user details page 
function viewDetails(id){
    window.location.href= `userDetail.html?id=${id}`;
}

const fetchAllUsers = async ()=> {
    let main = document.querySelector("main");
    try{
   const response = await fetch("http://localhost:500/users");
   console.log(response);
   const data = await response.json();
   console.log(data);

//    console.log(main);
    if(data.length > 0){
    main.innerHTML = data.map((user)=> {
        return `<div class="user-card"> 
                <img src = "${user.profileURL}" alt = "${user.firstName}" />
                <h2> ${user.firstName} ${user.lastName} </h2>
                <section> 
                    <h3>${user.designation} </h3>
                    <span> ${user.experience} </span>
                </section>
                <button onclick = "viewDetails(${user.userId})" } >View Details</button>
        </div>`
    }).join("");   // to remove , from the frontend
}
else{
     main.innerHTML = `<h1> Please add atleast one data </h1>`    
}
    }
        catch(error){
        console.log("please start the server");
        main.innerHTML = `<h1> Please Start the server... </h1>` 
        
    }
}
fetchAllUsers();