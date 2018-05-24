var StringHelper = new function () {
    this.AllIndexOf = function(str, toSearch) {
        var indices = [];
        for (var pos = str.indexOf(toSearch) ; pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
            indices.push(pos);
        }
        return indices;
    }
    this.Translit = function (text) {
        // Символ, на который будут заменяться все спецсимволы
        var space = '-';
        // Берем значение из нужного поля и переводим в нижний регистр
        //var text = $('.' + classname).html();
        // Массив для транслитерации
        var transl = {
            'А': 'A', 'Ә': 'Á', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Ғ': 'Ǵ', 'Һ': 'H', 'І': 'I', 'Д': 'D', 'Е': 'E', 'Ё': 'Е', 'Ж': 'J',
            'З': 'Z', 'И': 'I', 'Й': 'I', 'К': 'K', 'Қ': 'Q', 'Л': 'L', 'М': 'M', 'Н': 'N', 'Ң': 'Ń',
            'О': 'O', 'Ө': 'Ó', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'Ý', 'Ү': 'Ú', 'Ұ': 'U', 'Ф': 'F', 'Х': 'H',
            'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sh', 'Ъ': space, 'Ы': 'Y', 'Ь': space, 'Э': 'E', 'Ю': 'Iý', 'Я': 'Ia',
            'а': 'a', 'ә': 'á', 'б': 'b', 'в': 'v', 'г': 'g', 'ғ': 'ǵ', 'һ': 'h', 'і': 'i', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'j',
            'з': 'z', 'и': 'i', 'й': 'i', 'к': 'k', 'қ': 'q', 'л': 'l', 'м': 'm', 'н': 'n', 'ң': "ń",
            'о': 'o', 'ө': 'ó', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'ý', 'ү': 'ú', 'ұ': 'u', 'ф': 'f', 'х': 'h',
            'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': space, 'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'iý', 'я': 'ia'
        }

        var result = '';
        var curent_sim = '';

        for (i = 0; i < text.length; i++) {
            // Если символ найден в массиве то меняем его
            if (transl[text[i]] != undefined) {
                if (curent_sim != transl[text[i]] || curent_sim != space) {
                    result += transl[text[i]];
                    curent_sim = transl[text[i]];
                }
            }
                // Если нет, то оставляем так как есть
            else {
                result += text[i];
                curent_sim = text[i];
            }
        }  

        result = StringHelper.TrimStr(result);

        // Выводим результат 
        //$('.' + classname).html(result);
        return result;
    }

    this.TrimStr =  function(s) {
        s = s.replace(/^-/, '');
        return s.replace(/-$/, '');
    }
}