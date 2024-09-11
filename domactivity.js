/* add your code here */

addEventListener("DOMContentLoaded", (event) => {
    var information = JSON.parse(content);
    var ids = []
    console.log(information);
    console.log(information[0].id);
    for (i = 0; i<information.length; i++) {
        ids[i] = information[i].id
    };
    console.log(ids)
});
