/* add your code here */

document.addEventListener("DOMContentLoaded", (event) => {
    fullPic = document.getElementById("full");
    title = document.getElementById("title");
    artist = document.getElementById("artist");

    const data = JSON.parse(content);

    ul = document.querySelector("ul");

    data.forEach(item => {
        l =document.createElement("li");
        
        i = document.createElement('img');
        i.id = item.id;
        i.src = "../inclassdomactivity002/images/small/" + item.id + ".jpg";
        
        l.appendChild(i)
        ul.appendChild(l)
        
    });

    ul.addEventListener("click", (e)=>{
        console.log(e.target.nodeName);
        if (e.target && e.target.nodeName == "IMG"){
            console.log("lalala")
            //document.querySelector("figure").innerHTML = "";
            
            fullPic.src = "../inclassdomactivity002/images/large/" + e.target.id + ".jpg";
            
            
        }
    })

  });
  
  