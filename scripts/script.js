function loadPage(page) {
    const contentDiv = document.getElementById('content');

    contentDiv.innerHTML = '';
    document.getElementById('card-container').innerHTML = '';
    document.getElementById('content-catalog-list').innerHTML = '';
    document.getElementById('content-catalog-cards').classList.add('hidden');
    document.getElementById('content-catalog-list').classList.add('hidden');
    document.getElementById('content-catalog-list').classList.add('hidden');
    console.log(page);
    const menu = document.querySelector('.mobile-menu');
    menu.classList.remove('active'); // Cache le menu en supprimant la classe active

    if (page == 'creations.html') {
        loadCards();
    }
    else if (page == 'catalogue.html') {
        loadList();
    }
    else {
        //document.getElementById('content-catalog-cards').classList.remove('hidden');
        // Effectuer une requête pour charger le fichier HTML
        fetch(`pages/${page}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Page non trouvée');
                }
                return response.text();
            })
            .then(html => {
                // Injecter le contenu HTML dans la div
                contentDiv.innerHTML = html;
            })
            .catch(error => {
                contentDiv.innerHTML = '<p>Une erreur est survenue lors du chargement de la page.</p>';
                console.error(error);
            });
    }
}

// Charger une page par défaut (ex: accueil) au démarrage
document.addEventListener('DOMContentLoaded', () => {
    loadPage('accueil.html');
});

function toggleMenu() {
    const menu = document.querySelector('.mobile-menu');
    menu.classList.toggle('active');
}

function loadCards() {
    // Chargement des données à partir du fichier JSON
    fetch('datas/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des données JSON');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('content-catalog-cards').classList.remove('hidden');

            const cardContainer = document.getElementById('card-container');
            const details = document.getElementById('details');
            /*
            const detailsTitle = document.getElementById('details-title');
            const detailsImage = document.getElementById('details-image');
            const detailsDescription = document.getElementById('details-description');
            const detailsPrice = document.getElementById('details-price');
            const detailsCost = document.getElementById('details-cost');
            const detailsTime = document.getElementById('details-time');
            const backButton = document.getElementById('back-button');
            */
            cardContainer.innerHTML = '';
            details.classList.add('hidden');
            cardContainer.classList.remove('hidden');

            // Affichage des cartes
            data.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <h4>${item.name}</h4>
                    <!--<p>${item.price} €</p>-->
                `;
                card.addEventListener('click', () => {
                    /*
                    cardContainer.classList.add('hidden');
                    details.classList.remove('hidden');

                    detailsTitle.textContent = item.name;
                    detailsImage.src = item.image;
                    detailsDescription.textContent = `Description : ${item.description}`;
                    detailsPrice.textContent = `Prix : ${item.price} €`;
                    detailsCost.textContent = `Coût de revient : ${item.cost} €`;
                    detailsTime.textContent = `Temps de fabrication : ${item.time} heures`;
                    */
                });
                cardContainer.appendChild(card);
            });

            // Gestion du bouton retour
            backButton.addEventListener('click', () => {
                details.classList.add('hidden');
                cardContainer.classList.remove('hidden');
            });
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
}
function loadList() {
    // Chargement des données à partir du fichier JSON
    fetch('datas/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des données JSON');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('content-catalog-list').classList.remove('hidden');

            const listContainer = document.getElementById('content-catalog-list');

            listContainer.innerHTML = ''; // Réinitialisation du conteneur

            // Affichage des articles avec disposition en ligne
            data.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('item');

                itemElement.innerHTML = `
                    <div class="item-content">
                        <div class="item-left">
                            <img src="${item.image}" alt="${item.name}">
                            <h3>${item.name}</h3>
                        </div>
                        <div class="item-right">
                            <p>${item.description}</p>
                            <div class="price">€${item.price}</div>
                            <div class="details">
                                <p>Coût de revient : €${item.cost}</p>
                                <p>Temps de fabrication : ${item.time} heures</p>
                            </div>
                        </div>
                    </div>
                `;

                listContainer.appendChild(itemElement);
            });
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
}
