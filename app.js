function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("nl-NL");
}
async function loadMembers() {
    try {

        const response = await fetch(
            "https://api.wiseoldman.net/v2/groups/6205/csv"
        );

        const csv = await response.text();

        const rows = csv.trim().split("\n");

        const members = rows.slice(1).map(row => {

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

        members.sort((a, b) => b.days - a.days);

        const table =
            document.getElementById("membersTable");

        table.innerHTML = "";

        let active = 0;
        let warning = 0;
        let inactive = 0;

        members.forEach(player => {

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
                active++;
            }

            table.innerHTML += `
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
            members.length;

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

function filterTable() {

    const search = document
        .getElementById("search")
        .value
        .toLowerCase();

    const rows =
        document.querySelectorAll("#membersTable tr");

    rows.forEach(row => {

        row.style.display =
            row.innerText.toLowerCase().includes(search)
                ? ""
                : "none";

    });
}

loadMembers();
