const GROUP_ID = 6205;

async function loadMembers() {

const response = await fetch(
`https://api.wiseoldman.net/v2/groups/${GROUP_ID}/members`
);

const members = await response.json();

let active = 0;
let warning = 0;
let inactive = 0;

const tbody =
document.getElementById("membersTable");

tbody.innerHTML = "";

members.forEach(player => {

const lastProgress =
new Date(player.updatedAt);

const today = new Date();

const days =
Math.floor(
(today - lastProgress) /
(1000 * 60 * 60 * 24)
);

let rowClass = "";

if(days >= 180){
inactive++;
rowClass = "inactive";
}
else if(days >= 90){
warning++;
rowClass = "warning";
}
else{
active++;
}

const row = `
<tr class="${rowClass}">
<td>${player.displayName}</td>
<td>${player.role}</td>
<td>${player.exp.toLocaleString()}</td>
<td>${player.joinedAt ?? "-"}</td>
<td>${lastProgress.toLocaleDateString()}</td>
<td>${days}</td>
</tr>
`;

tbody.innerHTML += row;

});

document.getElementById("members").innerText =
members.length;

document.getElementById("active").innerText =
active;

document.getElementById("warning").innerText =
warning;

document.getElementById("inactive").innerText =
inactive;

}

function filterTable(){

let filter =
document.getElementById("search")
.value.toUpperCase();

let rows =
document.querySelectorAll("#membersTable tr");

rows.forEach(row => {

if(
row.innerText.toUpperCase()
.includes(filter)
){
row.style.display="";
}else{
row.style.display="none";
}
});
}

loadMembers();
