$(document).ready(function() {

    var rawData; // donnée brute 
    const maxYear = 2018; // Date la plus haute dans la base de donnée
    const yearRange = 10; // Nombre par défaut d'année à afficher sur le graphique

    // Appel du fichier CSV
    $.ajax({
        type: "GET",
        url: "database.csv",
        dataType: "text",
        success: function(res) { // fonction qui se déclenche que si l'appel fonctionne
            let rawData = Papa.parse(res).data; // Utilisation de la librairie Papaparse pour transformer le CSV en JSON
            data = getMovieByYear(rawData, maxYear, yearRange) //on récupère les infos qui nous intéressent
            drawNewChart(data); //ce qui dessine le graphique
        }
     });


     // Renvoie à partir de donnée brut le nombre de film par année
     function getMovieByYear(data, start, range){
        // Prépare l'objet de retour
        var obj = {
            year: Array(range),
            data: Array(range) 
        }
        // Pour chaque année
        for(let y=0; y<range; y++){
            obj.year[y] = start - y; //start = année de début. y = année
            obj.data[y] = 0;

            // Pour chaque film de la bdd
            for(let i=1;i<data.length;i++){
                
                // Si année de sortie = currentYear
                if(data[i][1] == start - y){
                    obj.data[y]++;
                }
            }
        }

        // Renvoie l'objet
        return obj
     }




     // Crée le graphique à partir des données trier
     function drawNewChart(data){
        var canvas = document.getElementById('myChart');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        var myChart = new Chart(ctx, {      
            type: 'bar',
            data: {
                labels: data.year,
                datasets: [{
                    label: '# of Votes',
                    data: data.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
     }

    



});