# П.О.П.О.Х.
## Программа обработки протокола основных характеристик

Это приложение решает проблему чтения многострочного протокола (около тысячи параметров) выдаваемого программой контроля специального продукта, в _.txt_ формате. Приложение помогает за кратчайшее время найти уязвимые места выпускаемого продукта, минимизирует человеческий фактор при контроле.  

На старте приложение предлагает dropzone, которая позволяет перносом или кликом загрузить .txt файл протокола в приложение.
По событию загрузки файла итенрфейс меняется на две панели навигации и таблицу параметров:

- Верхняя панель навигации предоставляет два элемента управления, которые отвечают за отображение в таблице параметров с определенным диапазоном процентоного отклонения.

- Нижняя панель навигации предоставляет три элемента поиска параметров по номерам : одного, диапазона, выборочного списка. Эта панель умеет валидировать свои поля.

- Таблица параметров, состоит из строк в которых указана основная информация о параметре. Строка имеет цвет фона зависимый от процентного отклонения. Для ускорения работы приложения применен способ Virtual Scroll вывода строк таблицы.

***

Для тестирования откройте приложение по [ссылке](https://eugene-axe.github.io/4P/) и следуйте указаниям приложения. Для теста спользуйте файл **"test_manyrows.txt"** из репозитроия.
