async function loadMembers() {
    try {
       const response = await fetch("https://api.wiseoldman.net/v2/groups/6205/csv");

        const csv = await response.text();

        console.log(csv);

        const rows = csv.trim().split("\n");

        // Eerste rij bevat kolomnamen
        const headers = rows[0].split(",");

        const members = rows.slice(1).map(row => {
            const values = row.split(",");

            return {
                player: values[0],
                role: values[1],
                xp: Number(values[2]) || 0,
                lastProgressed: values[3],
                lastUpdated: values[4],
                joined: values[5]
            };
        });

        console.log(members);

    } catch (error) {
        console.error("Fout bij ophalen Wise Old Man data:", error);
    }
}

loadMembers();
