let activeCardFilter = "all";
let allMembers = [];

function formatDate(dateString) {

    if (!dateString) return "-";

    const date = new Date(dateString);

    if (isNaN(date)) return dateString;

    return date.toLocaleDateString("nl-NL");
}

async function loadMembers() {
    try {

        const response = await fetch(
            "https://api.wiseoldman.net/v2/groups/6205/csv"
        );

        const csv = await response.text();

        const rows = csv.trim().split("\n");

        allMembers = rows.slice(1).map(row => {

            const values = row.split(",");

            const lastProgress = new Date(values[3]);
            const today = new Date();

            const daysInactive = Math.floor(
                (today - lastProgress) / (1000 * 60 * 60 * 24)
            );

            return {
                name: values[0],
                role: values[1],
                xp: Number(values[2]) || 0,
                lastProgress: values[3],
                joined: values[5],
                days: daysInactive
            };
        });

        allMembers.sort((a, b) => b.days - a.days);

        const table = document.getElementById("membersTable");

        table.innerHTML = "";

        let active = 0;
        let warning = 0;
        let inactive = 0;

        populateRoleFilter();

        allMembers.forEach(player => {

            let css = "";
            let status = "✅";

            if (player.days >= 180) {
                css = "inactive";
                status = "🔴";
                inactive++;
            }
            else if (player.days >= 90) {
                css = "warning";
                status = "🟧";
                warning++;
            }
            else {
                css = "active";
                active++;
            }

            table.innerHTML += `
                <tr class="${css}">
                    <td>${player.name}</td>
                    <td>${player.role}</td>
                    <td>${player.xp.toLocaleString()}</td>
                    <td>${formatDate(player.joined)}</td>
                    <td>${formatDate(player.lastProgress)}</td>
                    <td>${player.days}</td>
                    <td>${status}</td>
                </tr>
            `;
        });

    document.getElementById("members").innerText =
    allMembers.length;

        document.getElementById("active").innerText =
            active;

        document.getElementById("warning").innerText =
            warning;

        document.getElementById("inactive").innerText =
            inactive;

    } catch (error) {
        console.error("Fout:", error);
    }
}

function setCardFilter(filter) {

    activeCardFilter = filter;

    filterTable();
}

function filterTable() {

    const search =
        document.getElementById("search")
            .value
            .toLowerCase();

    const selectedRole =
        document.getElementById("roleFilter")
            .value
            .toLowerCase();

    const rows =
        document.querySelectorAll("#membersTable tr");

    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();

        const role =
            row.children[1]
                .innerText
                .toLowerCase();

        const matchesSearch =
            text.includes(search);

        const matchesRole =
            selectedRole === "" ||
            role === selectedRole;

        let matchesStatus = true;

if (activeCardFilter === "active") {

    matchesStatus =
        !row.classList.contains("warning") &&
        !row.classList.contains("inactive");
}

if (activeCardFilter === "warning") {

    matchesStatus =
        row.classList.contains("warning");
}

if (activeCardFilter === "inactive") {

    matchesStatus =
        row.classList.contains("inactive");
}

       row.style.display =
    matchesSearch &&
    matchesRole &&
    matchesStatus
        ? ""
        : "none";
    });
}

loadMembers();
function populateRoleFilter() {

    const roleFilter =
        document.getElementById("roleFilter");

    const currentValue = roleFilter.value;

    const roles = [
        ...new Set(
            allMembers.map(m => m.role)
        )
    ].sort();

    roleFilter.innerHTML =
        '<option value="">Alle Rollen</option>';

    roles.forEach(role => {

        roleFilter.innerHTML += `
            <option value="${role}">
                ${role}
            </option>
        `;
    });

    roleFilter.value = currentValue;
}
