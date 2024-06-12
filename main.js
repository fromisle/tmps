// Handle team joining
document.getElementById('join-team-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const joinTeamName = document.getElementById('join-team-name').value;
    const memberName = document.getElementById('member-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    console.log("Joining team:", joinTeamName, memberName, email, phone);

    const memberData = {
        name: memberName,
        email: email,
        phone: phone
    };

    db.collection('teams').doc(joinTeamName).get().then((doc) => {
        if (doc.exists) {
            let members = doc.data().members;
            members.push(memberData);

            db.collection('teams').doc(joinTeamName).update({
                members: members
            })
                .then(() => {
                    alert("Successfully joined the team!");
                    console.log("Team joined and Firestore updated.");
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
