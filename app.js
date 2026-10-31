function loadMembers() {

const dummyData = [

{
name:"Sev n Up",
role:"Quester",
xp:96403191,
days:48
},

{
name:"Voorbeeld Speler",
role:"Quester",
xp:120000000,
days:120
},

{
name:"Inactieve Speler",
role:"Maxed",
xp:350000000,
days:220
}

];

const table =
document.getElementById("membersTable");

table.innerHTML="";

let active=0;
let warning=0;
let inactive=0;

dummyData.forEach(player=>{

let css="";

if(player.days>=180){
css="inactive";
inactive++;
}
else if(player.days>=90){
css="warning";
warning++;
}
else{
active++;
}

table.innerHTML+=`
<tr class="${css}">
<td>${player.name}</td>
<td>${player.role}</td>
<td>${player.xp.toLocaleString()}</td>
<td>${player.days}</td>
</tr>
`;

});

document.getElementById("members").innerText =
dummyData.length;

document.getElementById("active").innerText =
active;

document.getElementById("warning").innerText =
warning;

document.getElementById("inactive").innerText =
inactive;

}

function filterTable(){

const search =
document.getElementById("search")
.value
.toLowerCase();

const rows =
document.querySelectorAll("#membersTable tr");

rows.forEach(row=>{

row.style.display =
row.innerText.toLowerCase().includes(search)
? ""
: "none";

});

}

loadMembers();
