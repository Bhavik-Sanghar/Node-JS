// public/showSIP.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('/sip')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#sipTable tbody');
        data.forEach(sip => {
            const formattedDate = new Date(sip.ValueDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sip.SIPID}</td>
                <td>${sip.FolioNumber}</td>
                <td>${sip.SchemeName}</td>
                <td>${sip.Amount}</td>
                <td>${formattedDate}</td>
                <td>${sip.UnitAllocation}</td>
                <td>${sip.NAV}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error:', error));
});
