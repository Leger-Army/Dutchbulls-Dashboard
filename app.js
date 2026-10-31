function loadMembers() {

const dummyData = [
{
name:"Sev n Up",
role:"Quester",
xp:96403191,
joined:"18-08-2025",
lastProgress:"13-09-2026",
days:48
},
{
name:"Voorbeeld Speler",
role:"Quester",
xp:120000000,
joined:"01-01-2025",
lastProgress:"03-07-2026",
days:120
},
{
name:"Inactieve Speler",
role:"Maxed",
xp:350000000,
joined:"05-04-2024",
lastProgress:"01-03-2026",
days:220
}
];

];

const table =
document.getElementById("membersTable");

let status = "✅ Actief";

if(player.days >= 180){
    status = "🔴 Inactief";
}
else if(player.days >= 90){
    status = "🟧 Waarschuwing";
}
  
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
<td>${player.joined}</td>
<td>${player.lastProgress}</td>
<td>${player.days}</td>
<td>${status}</td>
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
