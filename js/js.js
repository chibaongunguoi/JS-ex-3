const form=document.querySelector("form")
const value=document.querySelector("input")
const ul=document.querySelector("ul")
const show=document.getElementById("result")
var target;
var count=0;
var countelement=0;
let object=JSON.parse(localStorage.getItem("user"))
if (object==null)
object={}
else{
    for (i in object){
        const li=document.createElement("li");
        countelement+=1
        li.innerHTML=`<a data-n=${countelement} href="javascript:void(0)">${object[i]}
          <span><i class="fa-thin fa-trash-can" ></i></span>
          <span><i class="fa-solid fa-pencil"></i></span>
        </a> 
        <hr />`
       ul.appendChild(li)
       addevent();
    }
}

function update(){
    localStorage.setItem("user",JSON.stringify(object))
    let data=JSON.parse(localStorage.getItem("user"))
}
function write(){
    const li=document.createElement("li");
    countelement+=1
    li.innerHTML=`<a data-n=${countelement} href="javascript:void(0)">${value.value}
      <span><i class="fa-thin fa-trash-can" ></i></span>
      <span><i class="fa-solid fa-pencil"></i></span>
    </a> 
    <hr />`
    object[countelement]=value.value
    update();
   ul.appendChild(li)
   value.value="";
}

function edit(){
    target.innerHTML=`${value.value}<span><i class="fa-thin fa-trash-can" ></i></span>
    <span><i class="fa-solid fa-pencil"></i></span>`
    value.nextElementSibling.value="ADD TASK";
    form.dataset.type="add";
    target.children[0].addEventListener("click",function(){
        this.parentElement.removeEventListener("click",change);
        this.parentElement.parentElement.remove()
        })
        target.children[1].addEventListener("click",function(){
            this.parentElement.removeEventListener("click",change);
            value.value=this.parentElement.innerText;
            value.nextElementSibling.value="EDIT TASK";
            form.dataset.type="edit";
            target=this.parentElement
            })
}
form.addEventListener("submit",function (e){
    e.preventDefault(); 
    if (form.dataset.type=="edit") return edit()
    if (value.value=="") {return};
    write();
   addevent();
})

function change(){
    if ("line-through"==this.style.textDecoration){
    this.style.textDecoration="none";count-=1;
    }
else
{this.style.textDecoration="line-through";count+=1;}
    if (count>0)
    show.innerHTML=`Yeah, ${count} task completed!`
else show.innerHTML=``;
}

function check(){
    this.addEventListener("click",change)
}
function addevent(){
    const a=document.querySelector("#list li:last-child a");
    a.addEventListener("click",change)
    a.addEventListener("click",check)
    let [b,c]=a.children
    b.addEventListener("click",function(){
        a.removeEventListener("click",change);
        const g=this.parentElement.dataset.n
        delete(object[g])
    this.parentElement.parentElement.remove()
    })
    c.addEventListener("click",function(){
        this.parentElement.removeEventListener("click",change);
        value.value=this.parentElement.innerText;
        value.nextElementSibling.value="EDIT TASK";
        form.dataset.type="edit";
        target=this.parentElement
        })
 }
