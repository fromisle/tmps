
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


// Initialize EmailJS in firebase-config.js
(function() {
    emailjs.init("YOUR_USER_ID");
})();

// Modify main.js to send email when team is full
if (members.length === doc.data().teamSize) {
    // Prepare email content
    const templateParams = {
        team_name: joinTeamName,
        members: JSON.stringify(members, null, 2)
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert("All members have joined. Information has been sent via email.");
        }, (error) => {
            console.log('FAILED...', error);
        });
}