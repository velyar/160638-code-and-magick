'use strict';

var WIZARD_OPTIONS = {
  name: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],
  surname: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],
  coatColor: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  eyesColor: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ],
};

var WIZARDS_COUNT = 4;

function getRandomElement(array) {
  return array[parseInt(Math.random() * 100 * array.length, 10) % array.length];
}

function generateWizard() {
  return {
    name: getRandomElement(WIZARD_OPTIONS.name) + ' ' + getRandomElement(WIZARD_OPTIONS.surname),
    coatColor: getRandomElement(WIZARD_OPTIONS.coatColor),
    eyesColor: getRandomElement(WIZARD_OPTIONS.eyesColor)
  };
}

function createDomWizard(wizard, similarWizardTemplate) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}


(function () {
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');

  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var wizards = [];

  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizards.push(generateWizard());
  }

  var fragment = document.createDocumentFragment();
  for (i = 0; i < wizards.length; i++) {
    fragment.appendChild(createDomWizard(wizards[i], similarWizardTemplate));
  }
  similarListElement.appendChild(fragment);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
