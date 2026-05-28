
  let taxSwitch = document.getElementById("switchCheckDefault");
  taxSwitch.addEventListener("click",()=>{
    let taxInfo=document.getElementsByClassName("tax-info");
    for(info of taxInfo)
  {
      if(info.style.display != "inline")
      {
        info.style.display = "inline"
      }else{
        info.style.display = "none"
      }
  }
  });


  

document.querySelectorAll("#searchInput").forEach(searchInput => {

searchInput.addEventListener("keyup", function () {

const value =
this.value.trim().toLowerCase();

document
.querySelectorAll(".listing-card")
.forEach(card => {

const title =
card.querySelector("b")
.textContent
.toLowerCase();

card.parentElement.style.display =
title.includes(value)
? ""
: "none";

});

});

});




