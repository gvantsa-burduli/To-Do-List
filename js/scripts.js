
let funcion = () =>{
let text = document.getElementById("input").value;


if(text === ''){
    alert("Please add something!")
}
else {
    let li = document.createElement("li");
    document.getElementById("ul").appendChild(li);
    li.innerHTML = text;
    let span = document.createElement("span");
    span.innerHTML = "\u2718";
    li.appendChild(span);
    span.addEventListener("click", () => {
        li.style.display = "none"; 
      });
  }
}

document.getElementById("add").addEventListener("click", funcion);

document.getElementById("input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      funcion();
    }
  });