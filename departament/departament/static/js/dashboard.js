document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('caseStatusChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const openCases = parseInt(canvas.getAttribute('data-open')) || 0;
    const closedCases = parseInt(canvas.getAttribute('data-closed')) || 0;
    const coldCases = parseInt(canvas.getAttribute('data-cold')) || 0;

    const data = {
        labels: ['Open', 'Closed', 'Cold Case'],
        datasets: [{
            data: [openCases, closedCases, coldCases],
            backgroundColor: [
                '#dc3545', // Danger (Open)
                '#198754', // Success (Closed)
                '#ffc107'  // Warning (Cold)
            ],
            borderWidth: 0,
            hoverOffset: 4
        }]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            let value = context.raw;
                            let total = context.chart._metasets[context.datasetIndex].total;
                            let percentage = Math.round((value / total) * 100) + '%';
                            return label + value + ' (' + percentage + ')';
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
});
