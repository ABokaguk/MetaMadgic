document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const submitButton = document.getElementById('myButton'); // Изменено на #myButton, чтобы получить кнопку по id
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Проверка на заполнение обязательных полей
        const requiredFields = form.querySelectorAll('input._req, textarea._req');
        let formIsValid = true;
        requiredFields.forEach(field => {
            if (!field.value.trim()) { // Если значение поля пусто или состоит только из пробелов
                field.classList.add('_error'); // Добавляем класс ошибки для поля
                formIsValid = false; // Устанавливаем флаг в false, если хотя бы одно поле не заполнено
            } else {
                field.classList.remove('_error'); // Убираем класс ошибки, если поле заполнено
            }
        });

        if (!formIsValid) {
            return; // Прерываем отправку формы, если хотя бы одно обязательное поле не заполнено
        }
        
        submitButton.classList.add('loading'); // Добавляем класс для изменения стиля кнопки при отправке

        var formData = new FormData(this);

        fetch('sendmail.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.message === 'ok') {
                    const successPopup = document.getElementById('success-popup');
                    const popupBackground = document.getElementById('popup-background');
                    successPopup.style.display = 'block';
                    popupBackground.style.display = 'block';

                    // Удаление классов стиля, чтобы кнопка вернулась к исходному состоянию
                    submitButton.classList.remove('loading'); 
                    submitButton.classList.add('success');

                    // Очистка формы
                    form.reset();

                    setTimeout(() => {
                        successPopup.style.display = 'none';
                        popupBackground.style.display = 'none';

                        // Удаление класса для возврата исходного цвета кнопки
                        submitButton.classList.remove('success');
                    }, 3000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
