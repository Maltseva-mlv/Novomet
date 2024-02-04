const vacancyBlocks = document.querySelectorAll('.block-vacancy');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close__btn');
const modalInner = document.querySelector('.modal__inner');
const products = document.querySelectorAll('.details')
const categories = document.querySelectorAll('.list__item');
const categoryInfos = document.querySelectorAll('.product__info');


function closeModal() {
    modal.classList.remove("open__modal");
}

if (vacancyBlocks.length > 0 && modal && modalInner && closeButton) {
    vacancyBlocks.forEach(block => {

        const title = block.getAttribute('data-title');
        const location = block.getAttribute('data-location');
        const time = block.getAttribute('data-time');
    
        block.querySelector('.vacancy__name').textContent = title;
        const ul = document.createElement('ul');
        ul.className = 'vacancy__meta';
        ul.innerHTML = `
                    <li>
                        <img src="../img/location.png" alt="" class="vacancy__meta--icon">
                        <span>${location}</span>
                    </li>
                    <li>
                        <img src="../img/time.png" alt="" class="vacancy__meta--icon">
                        <span>${time}</span>
                    </li>
        `;
    
        block.appendChild(ul);
    
        block.addEventListener('click', function() {
    
            const title = this.getAttribute('data-title');
            const salary = this.getAttribute('data-salary');
            const duties = this.getAttribute('data-duties').split(',');
            const conditions = this.getAttribute('data-conditions').split(',');
    
            modal.querySelector('.modal__title').textContent = title;
            modal.querySelector('.salary').textContent = salary;
            
            const dutiesList = modal.querySelector('.desc__vacancy .duty:nth-child(1)'); 
            dutiesList.innerHTML = '<h4 class="duty__title">Задачи: </h4>'; 
            duties.forEach(duty => {
                const li = document.createElement('li');
                li.className = 'duty__item';
                li.textContent = duty;
                dutiesList.appendChild(li);
            });
    
            const conditionsList = modal.querySelector('.desc__vacancy .duty:nth-child(2)'); 
            conditionsList.innerHTML = '<h4 class="duty__title">Условия: </h4>';
            conditions.forEach(condition => {
                const li = document.createElement('li');
                li.className = 'duty__item';
                li.textContent = condition;
                conditionsList.appendChild(li);
            });
    
            modal.classList.add("open__modal");
        });
    });

}

if (products.length > 0 && modal) {
    products.forEach(product => {
        product.addEventListener('click', function() {
            modal.classList.add("open__modal");
            console.log('ghb');
        });
    })    
}

if (closeButton) {
    closeButton.addEventListener('click', closeModal);
}


window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});

if (modal && modalInner) {
    modal.addEventListener('click', (event) => {
        if (!modalInner.contains(event.target)) {
            closeModal();
        }
    });
}

document.querySelectorAll('.services__block').forEach(block => {
    block.addEventListener('click', () => {
        const category = block.getAttribute('data-category');
        window.location.href = `pages/products.html#${category}`;
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const hash = window.location.hash; 
    hideAllInfos(); 

    if (hash && document.querySelector(hash)) {
        const activeCategoryItem = document.querySelector(`.list__item[data-category="${hash.substring(1)}"]`);
        if (activeCategoryItem) {
            setActiveCategory(activeCategoryItem);
        }
    } else {
        setActiveCategory(initialCategoryItem); 
    }
});

function setActiveCategory(activeItem) {

    categories.forEach(category => {
        category.classList.remove('active__item');
    });

    activeItem.classList.add('active__item');
    showInfo(activeItem.getAttribute('data-category'));
}

categories.forEach(category => {
    category.addEventListener('click', function (event) {
        event.preventDefault();
        setActiveCategory(this);
    });
});


if (categories.length > 0 && categoryInfos.length > 0) {
    
    categories.forEach(category => {
        category.addEventListener('click', function (event) {
            event.preventDefault();
    
            var categoryId = this.getAttribute('data-category');
    
            hideAllInfos();
            showInfo(categoryId);
    
            categories.forEach(otherCategory => {
                otherCategory.classList.remove('active__item');
            });
    
            this.classList.add('active__item');
        });
    });
    
}

function hideAllInfos() {
    document.querySelectorAll('.product__info').forEach(info => {
        info.style.display = 'none';
    });
}

function showInfo(categoryId) {
    const info = document.getElementById(categoryId);
    if (info) {
        info.style.display = 'flex';
    }
}


const initialCategoryId = 'ending';
const initialCategoryItem = document.querySelector(`[data-category="${initialCategoryId}"]`);

if (initialCategoryItem && categories.length > 0) {
initialCategoryItem.classList.add('active__item');

    categories.forEach(category => {
        var categoryId = category.getAttribute('data-category');
        if (categoryId !== initialCategoryId) {
            hideAllInfos();
            showInfo(initialCategoryId);
        }
    });
}