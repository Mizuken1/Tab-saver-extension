var myLeads =[];

var inputEl= document.getElementById('input-el')
var savBtn= document.getElementById('saveBtn');
var ulEl= document.getElementById('ul-el');
var listItems="";
var deleteBtn= document.getElementById('deleteBtn');
var saveTabBtn= document.getElementById('saveTabBtn');

var LeadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"));


if(LeadsFromLocalStorage){
    myLeads=LeadsFromLocalStorage;
    render(myLeads);
};
console.log(LeadsFromLocalStorage);

savBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value);
    inputEl.value='';
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    render(myLeads);
   
});


deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear();
    myLeads=[];
    render(myLeads);
})


console.log(localStorage.getItem("myLeads"));

function render(lead) {
    let listItems = ""
    for (let i = 0; i < lead.length; i++) {
        listItems += `
            <li class="lis">
                <a target='_blank' href='${lead[i]}'>
                    ${lead[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}

saveTabBtn.addEventListener("click",function(){
   
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads);
    })
  
} )
console.log(myLeads);