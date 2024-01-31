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

// Работа с открытием вакансий
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

products.forEach(product => {
    product.addEventListener('click', function() {
        modal.classList.add("open__modal");
        console.log('ghb');
    });
})


closeButton.addEventListener('click', closeModal);

window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});

modal.addEventListener('click', (event) => {
    if (!modalInner.contains(event.target)) {
        closeModal();
    }
});

// Работа с переключением услуг

function hideAllInfos() {
    categoryInfos.forEach(function (info) {
        info.style.display = 'none';
    });
}

 function showInfo(categoryId) {
    var selectedInfo = document.getElementById(categoryId);

    categoryInfos.forEach(function (info) {
        if (info === selectedInfo) {
            info.style.display = 'flex';
        } else {
            info.style.display = 'none';
        }
    });
}

const initialCategoryId = 'ending';

const initialCategoryItem = document.querySelector(`[data-category="${initialCategoryId}"]`);
initialCategoryItem.classList.add('active__item');

// Скрываем все элементы категорий при загрузке страницы, кроме "Заканчивание скважин"
categories.forEach(category => {
    var categoryId = category.getAttribute('data-category');
    if (categoryId !== initialCategoryId) {
        hideAllInfos();
        showInfo(initialCategoryId);
    }
});

// Показываем информацию при клике по категории
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