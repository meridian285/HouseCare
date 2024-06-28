$(document).ready(function () {
    new WOW({
        animateClass: 'animate__animated',
    }).init();

    $('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }
    });

    // Замена местами item__images и item__content в блоке Наши проекты
    let items = document.querySelectorAll('.item');
    let projectTitle = document.querySelectorAll('.project-title');
    projectTitle.forEach((item, index) => {
        if (index % 2 !== 0) {
            item.style.order = '-1';
            item.parentElement.classList.remove('justify-item-end');
        }
    });

    // аккордион
    $('.accordion-title').click(function () {
        $('.accordion-content').slideToggle("show");

        let imageArrow = document.querySelector('.image-arrow');

        if (imageArrow.classList.contains('turn-transform')) {
            imageArrow.classList.remove('turn-transform')
        } else {
            imageArrow.classList.add('turn-transform');
        }
    });

    // swiper
    new Swiper('.swiper', {
        // Optional parameters
        effect: "slider",
        // slidesPerView: 1,
        centeredSlides: true,
        direction: 'horizontal',
        initialSlide: 1,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1000: {
                slidesPerView: 3,
              },
        }
    });


    // swiper
    let swiperSlide = document.querySelectorAll('.swiper-slide');

    let swiperButtonNext = document.getElementById('swiper-button-next');
    swiperButtonNext.addEventListener('click', () => {
        swiperSlide.forEach((item) => {
            let swiperSlideContent = item.querySelector('.swiper-slide__content');
            if (item.classList.contains('swiper-slide-active')) {
                swiperSlideContent.classList.remove('hidden');
            } else {
                swiperSlideContent.classList.add('hidden');
            }
        })
    })
    let swiperButtonPrev = document.getElementById('swiper-button-prev');
    swiperButtonPrev.addEventListener('click', () => {
        swiperSlide.forEach((item) => {
            let swiperSlideContent = item.querySelector('.swiper-slide__content');
            if (item.classList.contains('swiper-slide-active')) {
                swiperSlideContent.classList.remove('hidden');
            } else {
                swiperSlideContent.classList.add('hidden');
            }
        })
    })  


    // маска телефона для формы
    $("#phone").mask("+7(999)999-99-99");
    // маска телефона для формы попап
    $("#phone-popup").mask("+7(999)999-99-99");


// валидация формы
    $('#form').validate({
        rules: {
            name: {
                required: true,
            },
            phone: {
                required: true,
            },
            checkbox: {
                required: true,
            },
        },
        messages: {
            name: 'Необходимо ввести ваше имя',
            phone: 'Необходимо ввести ваш номер телефона',
            checkbox: 'Для продолжения согласитесь с правилами',
        },
        submitHandler: function () {
            // обработка отправки формы
            let name = $('#name');
            let phone = $('#phone');
            let hasError = false;

            if (!hasError) {
                // ajax
                $.ajax({
                    method: "POST",
                    url: "http://testologia.ru/checkout",
                    data: {name: name.val(), phone: phone.val()}
                })
                    .done(function (msg) {
                        console.log(msg)
                        if (msg.success) {
                            alert('Произошла ошибка, попробуйте еще раз')
                        } else {
                            $('#form').css('display', 'none')
                            $('#success-message').css('display', 'flex')
                        }
                    });
            }
        }
    })

// валидация формы popup
    const popupValidator = $('#form-popup').validate({
        rules: {
            name: {
                required: true,
            },
            phone: {
                required: true,
            },
            checkboxPopup: {
                required: true,
            },
        },
        messages: {
            name: 'Необходимо ввести ваше имя',
            phone: 'Необходимо ввести ваш номер телефона',
            checkboxPopup: 'Для продолжения согласитесь с правилами',
        },
        submitHandler: function () {
            // обработка отправки формы
            let name = $('#name-popup');
            let phone = $('#phone-popup');
            let hasError = false;

            if (!hasError) {
                // ajax
                $.ajax({
                    method: "POST",
                    url: "http://testologia.ru/checkout",
                    data: {name: name.val(), phone: phone.val()}
                })
                    .done(function (msg) {
                        console.log(msg)
                        if (msg.success) {
                            $('#form-popup').css('display', 'none')
                            $('#success-message-popup').css('display', 'flex')
                        } else {
                            alert('Произошла ошибка, попробуйте еще раз')
                        }
                    });
            }
        }
    });

    // popup при нажатии Записаться
    $('#sign-up').on('click', function () {
        $('.popup-statement').css('display', 'flex')
    })

    // нажатие на чекбокс
    let checkbox = document.getElementById('checkbox__label-popup');
    $('#checkbox__label-popup').on('click', function () {

        let opacityValue = getComputedStyle(checkbox).getPropertyValue('--opacity');

        if (opacityValue === '1') {
            document.getElementById('checkbox__label-popup').style.setProperty('--opacity', '0');
        } else {
            document.getElementById('checkbox__label-popup').style.setProperty('--opacity', '1');
        }
    });

    // закрытие popup с очисткой полей
    $('.close').on('click', function () {
        $('#success-message-popup').css('display', 'none');
        $('#form-popup').css('display', 'flex').trigger('reset');
        popupValidator.resetForm();
        document.getElementById('checkbox__label-popup').style.setProperty('--opacity', '0');
        $('.popup-statement').css('display', 'none');
    })


    // technologies-content

    let technology = document.querySelectorAll('.technology');
    let technologiesContent = document.querySelector('.technologies-content');
    let content = technologiesContent.querySelector('.content');
    let triangle = document.querySelector('.triangle');

    technology.forEach((item) => {
        let technologiesCore = item.querySelector('.technologies__core');

        // копирование текста из нужного блока
        let technologyTitleText = item.querySelector('.technology-title').textContent;
        let technologyTextText = item.querySelector('.technology-text').textContent;

        // событие click
        item.addEventListener('click', () => {

            technology.forEach((item) => {
                item.style.borderColor = 'rgb(236, 197, 106)';
                item.querySelector('.technologies__core').style.backgroundColor = 'rgb(236, 197, 106)';
            });

            item.style.borderColor = 'rgb(252, 237, 203)';
            technologiesCore.style.backgroundColor = 'rgb(252, 237, 203)';

            // меняем текст
            content.innerHTML = `<h5 class="technology-title">${technologyTitleText}</h5>
                                 <p class="technology-text">${technologyTextText}</p>`;

            // Пробую взять значение left с кружков и передать в стрелку,
            let left = technologiesCore.getBoundingClientRect().left;
            // координата Y блока technologies-сontent
            let technologiesContent = document.querySelector('.technologies-content').getBoundingClientRect().left;
            // меняем расположение стрелочки
            triangle.style.left = `${left - technologiesContent}`;
        })
    })
});




