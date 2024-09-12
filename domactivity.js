/* add your code here */

document.addEventListener("DOMContentLoaded", (event) => {
    fullPic = document.getElementById("full");
    title = document.getElementById("title");
    artist = document.getElementById("artist");
    figure = document.querySelector("figure")
    desc = document.getElementById("description")

    const data = JSON.parse(content);
    arr = []

    ul = document.querySelector("ul");
    let count = 0;

    data.forEach(item => {
        l =document.createElement("li");
        arr.push(item);
        i = document.createElement('img');
        i.id = count;
        i.src = "../inclassdomactivity002/images/small/" + item.id + ".jpg";
        
        l.appendChild(i)
        ul.appendChild(l)
        count++
        
    });
    console.log(arr);
    ul.addEventListener("click", (e)=>{
        console.log(e.target.nodeName);
        if (e.target && e.target.nodeName == "IMG"){
            console.log("lalala")
            document.querySelector("figure").innerHTML = "";
            title.innerHTML = arr[e.target.id].title
            artist.innerHTML = arr[e.target.id].artist
            fullPic = document.createElement('img');
            figure.append(fullPic);
            fullPic.src = "../inclassdomactivity002/images/large/" + arr[e.target.id].id + ".jpg";
            
            arr[e.target.id].features.forEach(feat =>{
                const rect = document.createElement("div");
                document.querySelector("figure").appendChild(rect);
                rect.className ="box";
                rect.style.position = "absolute";
                console.log(feat.upperLeft[0])
                rect.style.left = feat.upperLeft[0] + "px";
                rect.style.top = feat.upperLeft[1] + "px";
                rect.style.height =  feat.lowerRight[1] - feat.upperLeft[1] + "px";
                rect.style.width = feat.lowerRight[0] - feat.upperLeft[0] + "px";

                rect.addEventListener("mouseover", ()=>{
                    desc.textContent = feat.description;
                })
                rect.addEventListener("mouseout", ()=>{
                    desc.textContent = "";
                })
            });

            
            
        }
    })

  });
  
  