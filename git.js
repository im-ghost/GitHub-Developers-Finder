window.onload=()=>{
const main=elem("main");
const container=elem("#main");
const first_view=elem("#first_view")
const second_view=elem("#second_view");
const search_input=elem("#search_input");
const search=elem("#search_btn");
const goto=elem("#goto")
const theme=elem("#themes");

changetheme=(value)=>{
        value=theme.value;
        document.documentElement.classList.add(value);
}
theme.addEventListener("change", changetheme);
getUser=(user)=>{
      let username=user;  ur=`https://api.github.com/users/${username}`;
fetch(ur).then(response=>response.json()).then(data=>{
        let load=new Loader();
        load.start();
        load.addText("Peculiar GitHub Developers Finder Loading");
        load.animateText();
        load.remove(5000);
        load.removeOnTouch();
        console.log(data);
        if(data["login"]===undefined){
main.innerHTML="Sorry this user doesn't exit";
}
else{
    
    search_input.value="";
   first_view.innerHTML="";
   second_view.innerHTML="";
    first_view.style=`
`;
let image_div=document.createElement("div");
let img=document.createElement("img");
img.src=data["avatar_url"];
img.classList.add("img")
image_div.appendChild(img);
first_view.appendChild(image_div);
    let user_name=create("div",`<h3>${data["login"]}</h3>`,"user_name","user_name",first_view);
   
    

    let goToProfile=document.createElement("div");
    goToProfile.innerHTML="<div><h5>Profile<i class='fa fa-arrow-right'></i></h5></div>";
    goToProfile.classList.add("goto");
    goToProfile.setAttribute("id","goto");



    first_view.appendChild(goToProfile)
    goToProfile.addEventListener("click",()=>{
            container.classList.add("show_profile");
    })
second_view.addEventListener("click",()=>{
              container.classList.remove("show_profile");      
})


}
//for back
let backview_1=document.createElement("div");
let userimg=document.createElement("img");
userimg.src=data["avatar_url"];
userimg.classList.add("image")
backview_1.appendChild(userimg);
let user_name2=create("h5",data["login"],"user_name","user_name",backview_1);
let backview_2=document.createElement("div");
let bio=create("h6",data["bio"],"bio","bio",backview_2);
let influence=document.createElement("div");
influence.innerHTML=`

<div class="influence">
<div class="repo">
<figure><div>${data["public_repos"]}</div>
<figcaption>Repos</figcaption>
</figure>
</div>
<div class="followers">
<figure>
<div>${data["followers"]}</div>
<figcaption>followers</figcaption>
</figure>
</div>

<div class="following">
<figure>
<div>${data["following"]}</div>
<figcaption>following</figcaption>
</figure>
<div>
</div>


`
second_view.appendChild(influence);
let more_details=document.createElement("div");

let modal=document.createElement("div");
modal.classList.add("grid");
                fetch(data["followers_url"])
                .then(response => response.json())
                .then(data =>{ console.log(data);
                let followerList=document.createElement("ul");
                followerList.innerHTML="<h4>Followers</h4>"
                for(fol of data){  
                    followerList.innerHTML+=`<li>${fol["login"]}</li>` 
                       } modal.appendChild(followerList);
                       
                       });
                       fetch(data["repos_url"])
                       .then(response => response.json())
                       .then(data =>{ 
                       console.log(data);
                       let repoList=document.createElement("ul");
                       repoList.innerHTML="<h4>Repos</h4>"
                       for(repo of data){   
                            repoList.innerHTML+=`<li>${repo["name"]}</li>`
                            
                            }     modal.appendChild(repoList);
                            
                            });

more_details.appendChild(modal);
second_view.appendChild(more_details);
let others=document.createElement("div");
let location=document.createElement("div");
location.classList.add("location");

if(data["location"]===null||data["location"]===undefined){
        location.innerHTML="<span class='social'><i class='fa fa-map-marker'></i>-Not Provided</span>"
}
else{
location.innerHTML=`<i class="fa fa-map-marker fa-2x"></i><span class='social'>-${data["location"]}</span>`;
}
let twitter=document.createElement("div");
twitter.classList.add("twitter");
if(data["twitter_username"]===null||data["twitter_username"]===undefined){
        twitter.innerHTML="<span class='social'><i class='fa fa-twitter'></i>-Not Provided</span>"
}
else{
twitter.innerHTML=`<a href='www.twitter.com/${data["twitter_username"]} class="social"'><i class="fa fa-twitter fa-2x"></i></a>`}

let organization=document.createElement("div");
organization.classList.add("organization");
if(data["organizations_url"]===null||data["organizations_url"]===undefined){
        organization.innerHTML="<span class='social'><i class='fa fa-building-o'></i>-Not Provided</span>"
}
organization.innerHTML=`

<a class="social" href='${data["organizations_url"]}'><i class="fa fa-building-o"></i></a>
`
let link=document.createElement("div");
link.classList.add("link");
if(data["html_url"]===null||data["html_url"]===undefined){
     link.innerHTML="<span class='socila'><i class='fa fa-link fa-2x'></i>-Not Provided</span>"   
}
else{
link.innerHTML=`

<a class="social" href='${data["html_url"]}'><i class="fa fa-link"></i></a>
`}
others.appendChild(organization);

others.appendChild(location)
others.appendChild(twitter)
others.appendChild(link);
others.classList.add("grid_2")
second_view.appendChild(others);
})

};
search.addEventListener("click",()=>{
        getUser(search_input.value);
})
getUser("peculiar-codes");
}

