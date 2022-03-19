






    	const user=document.querySelector("#search_input");







    const search=document.querySelector("#search_btn");






    search.addEventListener("click",()=>{



main.textContent="";







      url=`https://api.github.com/users/${user.value}`;







fetch(url)






.then(response => response.json()).then(data =>{ console.log(data);


let load=new Loader();
load.start();
load.addText("Peculiar GitHub developers finder","0.3em");
load.animateText();
load.remove(5000);













let main=document.querySelector("#main");
main.style.opacity="1";


if(data["login"]===undefined){



main.innerHTML="Sorry this user doesn't exit";



}



else{



user.value="";





let userImg=document.createElement("div");
userImg.style=`

display:flex;
flex-flow:row wrap;
align-items:center;
justify-content:center;`;

let user_img=document.createElement("img");



user_img.src=data["avatar_url"];



user_img.classList.add("img")

userImg.appendChild(user_img)

let user_about=document.createElement("div");



let user_name=document.createElement("h2");



user_name.textContent=data["login"];



let joined_date=document.createElement("div");







let joi=new Date(data["created_at"]);



let year=joi.getFullYear();



let month=joi.getMonth();



let day=joi.getDate();

let all_months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
months=all_months[month]

joined_date.textContent=`Joined ${months} ${day},${year}`;



let email=document.createElement("div");



email.textContent=data["email"];



let bio=document.createElement("div");



bio.textContent=data["bio"];



user_about.appendChild(user_name);
user_about.appendChild(bio);
user_about.appendChild(joined_date);
user_about.appendChild(email);







user_about.classList.add("about");



let some_details=document.createElement("div");



let repo=document.createElement("figure");



let repo_no=document.createElement("div");



repo_no.innerHTML=`<i>${data["public_repos"]}</i>`;;



let repos=document.createElement("figcaption");



repos.textContent="Repo";



repo.appendChild(repo_no);



repo.appendChild(repos);



let follower=document.createElement("figure");



let follower_no=document.createElement("div");



follower_no.innerHTML=



`<i>${data["followers"]}</i>`;



let followers=document.createElement("figcaption");



followers.textContent="followers";



follower.appendChild(follower_no);



follower.appendChild(followers);



let following=document.createElement("figure");



let following_no=document.createElement("div");



following_no.innerHTML=`<a href="data['following_url']">${data["following"]}</a>`;







let followings=document.createElement("figcaption");



followings.textContent="following";



following.appendChild(following_no);



following.appendChild(followings);



some_details.appendChild(repo);



some_details.appendChild(follower);



some_details.appendChild(following);        let modal=document.createElement("div");






        fetch(data["following_url"])







.then(response => response.json()).then(data =>{ console.log(data);



let followingList=document.createElement("ul");

followingList.classList.add("modal");

for(fol of data){

        followingList.innerHTML+=`<li>${fol["login"]}</li>`



    }    modal.appendChild(followingList);



});





        fetch(data["followers_url"])
.then(response => response.json()).then(data =>{ console.log(data);



let followerList=document.createElement("ul");

followerList.innerHTML="<h4>Followers</h4>"

for(fol of data){

        followerList.innerHTML+=`<li>${fol["login"]}</li>`



     }   modal.appendChild(followerList);



});



        fetch(data["repos_url"])
.then(response => response.json()).then(data =>{ console.log(data);
let repoList=document.createElement("ul");
repoList.innerHTML="<h4>Repos</h4>"
for(repo of data){

        repoList.innerHTML+=`<li>${repo["name"]}</li>`

}

        modal.appendChild(repoList);

});
let others=document.createElement("div");
let location=document.createElement("div");
location.classList.add("location");

if(data["location"]===null||data["location"]===undefined){
        location.innerHTML="<span class='social'>Not Provided</span>"
}
else{
location.innerHTML=`<i class="fa fa-map-marker fa-2x"></i><span class='social'>${data["location"]}</span>`;
}
let twitter=document.createElement("div");
twitter.classList.add("twitter");
if(data["twitter_username"]===null||data["twitter_username"]===undefined){
        twitter.innerHTML="<span class='social'>Not Provided</span>"
}
else{
twitter.innerHTML=`<i class="fa fa-twitter fa-2x"></i><span class="social"><a href='www.twitter.com/${data["twitter_username"]}'>${data["twitter_username"]}</a></span>`}

let organization=document.createElement("div");
organization.classList.add("organization");
if(data["organizations_url"]===null||data["organizations_url"]===undefined){
        organization.innerHTML="<span class='social'>Not Provided</span>"
}
organization.innerHTML=`
<i class="fa fa-building-o"><span class="social">
<a href='${data["organizations_url"]}'>${data["organizations_url"]}</a></span>
`
let link=document.createElement("div");
link.classList.add("link");
if(data["html_url"]===null||data["html_url"]===undefined){
     link.innerHTML="<span class='socila'>Not Provided</span>"   
}
else{
link.innerHTML=`
<i class="fa fa-link"><span class="social">
<a href='${data["html_url"]}'>${data["html_url"]}</a></span>
`}
others.appendChild(organization);

others.appendChild(location)
others.appendChild(twitter)
others.appendChild(link)
let header=document.createElement("div");
header.appendChild(userImg);
header.appendChild(user_about);
main.appendChild(header);
some_details.classList.add("grid_2");
main.appendChild(some_details);

main.appendChild(modal);

main.appendChild(others);


modal.classList.add("modal");




}
})

});


  
