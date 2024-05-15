// public/script.js
document.getElementById('sipForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        FolioNumber: document.getElementById('FolioNumber').value,
        SchemeName: document.getElementById('SchemeName').value,
        Amount: document.getElementById('Amount').value,
        ValueDate: document.getElementById('ValueDate').value,
        UnitAllocation: document.getElementById('UnitAllocation').value,
        NAV: document.getElementById('NAV').value
    };

    fetch('/sip', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        alert('Data inserted successfully');
        console.log(data);

        // Reset the form
        document.getElementById('sipForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});


document.getElementById('showSIP').addEventListener('click', function() {
    window.location.href = 'showSIP.html';
});