describe('Проверка авторизации', function () {

    it('Верный пароль и верный логин', function () {
         cy.visit('https://login.qa.studio/'); //Зашли на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяю цвет кнопки восст.пароль

         cy.get('#mail').type('german@dolnikov.ru'); //Ввели верный логин
         cy.get('#pass').type('iLoveqastudio1'); //Ввели верный пароль
         cy.get('#loginButton').click();//Нажали войти

         cy.get('#messageHeader').contains('Авторизация прошла успешно');//Проверяю, что после авторизации вижу текст
         cy.get('#messageHeader').should('be.visible');//Есть тест и он виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible');//Есть крестик и он виден для пользователя
     })
     it('Верный логин и неверный пароль', function () {
        cy.visit('https://login.qa.studio/'); //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяю цвет кнопки восст.пароль

        cy.get('#mail').type('german@dolnikov.ru'); //Ввели верный логин
        cy.get('#pass').type('iLoveqastudio7'); //Ввели НЕверный пароль
        cy.get('#loginButton').click();//Нажали войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет');//Проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible');//Есть тест и он виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');//Есть крестик и он виден для пользователя
    })
    it('Неверный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio/'); //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяю цвет кнопки восст.пароль

        cy.get('#mail').type('german@dolniikov.ru'); //Ввели НЕверный логин
        cy.get('#pass').type('iLoveqastudio1'); //Ввели верный пароль
        cy.get('#loginButton').click();//Нажали войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет');//Проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible');//Есть тест и он виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');//Есть крестик и он виден для пользователя
    })
    it('Проверка, что в логине есть @', function () {
        cy.visit('https://login.qa.studio/'); //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяю цвет кнопки восст.пароль

        cy.get('#mail').type('germandolnikov.ru'); //Ввели логин без @
        cy.get('#pass').type('iLoveqastudio1'); //Ввели верный пароль
        cy.get('#loginButton').click();//Нажали войти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');//Проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible');//Есть тест и он виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');//Есть крестик и он виден для пользователя
    })
    it('Проверка восстановления пароля', function () {
        cy.visit('https://login.qa.studio/'); //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяю цвет кнопки восст.пароль

 
        cy.get('#forgotEmailButton').click();//Нажимаю восстановить пароль
        cy.get('#mailForgot').type('german@dolnikov.ru');// Ввожу почту для восстановления пароля
        cy.get('#restoreEmailButton').click();// Нажала отправить код

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');//Проверяю на совпадение текст
        cy.get('#messageHeader').should('be.visible');//Есть тест и он виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');//Есть крестик и он виден для пользователя
    })
    it('Проверка на сточные буквы в логине', function () {
        cy.visit('https://login.qa.studio/'); //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяю цвет кнопки восст.пароль

        cy.get('#mail').type('GerMan@Dolnikov.ru'); //Ввели верный логин с заглавными буквами
        cy.get('#pass').type('iLoveqastudio1'); //Ввели верный пароль
        cy.get('#loginButton').click();//Нажали войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет');//Проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible');//Есть тест и он виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');//Есть крестик и он виден для пользователя
    })
    describe('Покупка аватара', function () {                                // название набора тестов
        it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
             cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
             cy.get('input[type="email"]').type('USER_LOGIN');                   // вводим логин
             cy.get('input[type="password"]').type('USER_PASSWORD');               // вводим пароль
             cy.get('button[type="submit"]').click();                        // нажимаем кнопку Подтвердить
             cy.wait(2000);
             cy.get('.header__container > .header__id').click({ force: true }); // Клик в шапке на аву тренера
             cy.get('[href="/shop"]').click();                               // нажимаем кнопку Магазин
             cy.get('.available > button').first().click({ force: true });   // кликаем Купить у первого доступного аватара
             cy.get('.credit').type('4620869113632996');                     // вводим номер карты
             cy.get('.k_input_ccv').type('125');                             // вводим CVV карты
             cy.get('.k_input_date').type('1225');                           // вводим срок действия карты
             cy.get('.k_input_name').type('NAME');                           // вводим имя владельца действия карты
             cy.get('.pay-btn').click();                                     // нажимаем кнопку Оплатить
             cy.get('#cardnumber').type('56456');                            // вводим код подтверждения СМС
             cy.get('.payment__submit-button').click();                      // нажимаем кнопку Отправить
             cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения о успешной покупке
         });
     });
    

    })