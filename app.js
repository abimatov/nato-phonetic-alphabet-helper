// ==UserScript==
// @name         NATO Phonetic Alhabet Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.natoAlphabetHelper = {};
    window.natoAlphabetHelper.ALPHABET = ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel', 'india', 'juliett', 'kilo', 'lima', 'mike', 'november', 'oscar', 'papa', 'quebec', 'romeo', 'sierra', 'tango', 'uniform', 'victor', 'whiskey', 'xray', 'yankee', 'zulu'];

    window.natoAlphabetHelper.getSelection = function () {
        var txt = '';
        if (window.getSelection) {
            txt = window.getSelection().toString();
        } else if (document.selection) {
            txt = document.selection.createRange().text;
        }
        return txt;
    };

    window.natoAlphabetHelper.convertWordIntoPhoneticPhrase = function (word) {
        var phrase = '';
        for (var i = 0; i < word.length; i++) { // "Arman"
            for (var j = 0; j < window.natoAlphabetHelper.ALPHABET.length; j++) {
                if (window.natoAlphabetHelper.ALPHABET[j][0].toLowerCase() == word[i].toLowerCase()) {
                    phrase += window.natoAlphabetHelper.ALPHABET[j] + ' ';
                }
            }
        }
        return phrase;
    };

    window.natoAlphabetHelper.run = function() {
        console.log("natoAlphabetHelper.run()");
        setTimeout(function () {
            document.addEventListener('click', function (e) {
                setTimeout(function () { // additional delay allows for a double click
                    var txt = window.natoAlphabetHelper.getSelection();
                    if (txt && txt.length) {
                        console.log(txt);
                        var newElement = document.createElement('div');
                        newElement.setAttribute('id', 'natoAlphabetHelper');
                        newElement.style = "position: fixed; background: #9c9c9c; bottom: 10px; left: 10px; font-size: 22px; padding: 5px;";
                        newElement.innerHTML = window.natoAlphabetHelper.convertWordIntoPhoneticPhrase(txt);
                        document.body.appendChild(newElement);
                    }
                    else {
                        var elToRemove = document.getElementById('natoAlphabetHelper');
                        if (elToRemove) elToRemove.remove();
                    }
                }, 50);
            });
        }, 100);
    };

    window.natoAlphabetHelper.run();

})();