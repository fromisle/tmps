// main.js

// Handle team creation
document.getElementById('create-team-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const teamName = document.getElementById('team-name').value;
    const teamSize = parseInt(document.getElementById('team-size').value);

    db.collection('teams').doc(teamName).set({
        teamSize: teamSize,
        members: []
    })
    .then(() => {
        alert("Team created successfully!");
        document.getElementById('team-creation').style.display = 'none';
        document.getElementById('join-team').style.display = 'block';
    })
    .catch((error) => {
        console.error("Error creating team: ", error);
    });
});

// Handle team joining
document.getElementById('join-team-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const joinTeamName = document.getElementById('join-team-name').value;
    const memberName = document.getElementById('member-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const memberData = {
        name: memberName,
        email: email,
        phone: phone
    };

    db.collection('teams').doc(joinTeamName).get().then((doc) => {
        if (doc.exists) {
            let members = doc.data().members;
            members.push(memberData);

            if (members.length === doc.data().teamSize) {
                // Send email to all members (implementation needed)
                alert("All members have joined. Information will be sent via email.");
            }

            db.collection('teams').doc(joinTeamName).update({
                members: members
            })
            .then(() => {
                alert("Successfully joined the team!");
            })
            .catch((error) => {
                console.error("Error joining team: ", error);
            });
        } else {
            alert("No such team found!");
        }
    }).catch((error) => {
        console.error("Error getting team: ", error);
    });
});
