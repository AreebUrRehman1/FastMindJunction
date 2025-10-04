import {unitDetails, levelContainersTopic, gameLevels} from './WPH11/level-container-list.js';


//Automatic Title and Header Component Name
let valueOfLocalStorage = localStorage.getItem('subjectComponent');

if(valueOfLocalStorage === null){
  //Component Not Selected (CNS)
  document.title = 'CNS';
  document.querySelector('.component-js').innerHTML = "CNS";
} else{
  document.title = valueOfLocalStorage;
  document.querySelector('.component-js').innerHTML = valueOfLocalStorage;
}





//HTML Generator

const unitDQS = document.querySelector('.unit');


function generateUnitHTML() {
let allUnitsHTML = '';

// Loop through the unit details to create each main unit block
unitDetails.forEach((details, index) => {
  let levelContainerHTML = '';
  
  // Dynamically get the topics for the current unit
  const unitKey = 'Unit' + (index + 1);
  const currentTopics = levelContainersTopic[unitKey];

  if (currentTopics) {
    currentTopics.forEach((topic,index) => {
      let dataTopicId = 't' + (index + 1);
      let classStatus = '';
      let buttonContent = '';
      let newImage = 'coin2.png';
      let classStatusColor = '';

      gameLevels.forEach((game) => {
        if(topic.Topic === game.topic){
          let gameTopic = game

          if (gameTopic.status === "completed"){
          classStatus = 'completed-level';
          buttonContent = 'PRACTICE +5 XP';
          newImage = 'tick.png';
          classStatusColor = 'green-bsbg';
          }

          if (gameTopic.status === "current"){
          classStatus = 'current-level';
          buttonContent = 'LAUNCH +10 XP';
          newImage = 'act-coin.png';
          classStatusColor = topic.cellColor;
          }

        }
      })

  levelContainerHTML += `
    <div class="level-container" data-topic-id="${dataTopicId}">
      <div class="level ${topic.margin} ${classStatusColor}"><img class="coin2-icon" src="${newImage}" alt="coin icon"></div>
      <div class="click-details ${topic.popUpColor} ${classStatus}">
        <div class="click-details-text">${topic.Topic}</div>
        <button class="click-details-start">${buttonContent}</button>
      </div>
    </div>
      `;
    });
  }

  allUnitsHTML += `
    <div class="unit-details">
      <div class="unit ${details.UnitColor}">${details.UnitName}</div>
      <div class="levels-list">
        ${levelContainerHTML}
      </div>
    </div>
    `;
});

return allUnitsHTML;
}

unitDQS.innerHTML = generateUnitHTML();




//Display and Hide click-details
displayAndHide();

function displayAndHide(){
  const levelContainers = document.querySelectorAll('.level-container');

  levelContainers.forEach((container) => {
    container.addEventListener('click', (event) => {
    // Stop the click from propagating to the document listener.
    // This is crucial to prevent the pop-up from immediately closing.
    event.stopPropagation();
    
    const popupBox = container.querySelector('.click-details');

    if(popupBox.classList.contains('current-level') || popupBox.classList.contains('completed-level')){

    // Check if the pop-up is currently visible by checking for the 'active' class.
    const isActive = popupBox.classList.contains('active');

    // 1. Hide any other pop-ups that might be open.
    // This ensures only one pop-up is shown at a time.
    document.querySelectorAll('.click-details.active').forEach(p => {
      p.classList.remove('active');
    });

    // 2. If the clicked pop-up was not already active, make it visible.
    // This also handles the "click again to disappear" logic.
    if (!isActive) {
      popupBox.classList.add('active');
      }
    }

    })
  })


    // Add a click event listener to the entire document.
  document.addEventListener('click', (event) => {
    // Find any currently active pop-up.
    const activePopup = document.querySelector('.click-details.active');

    // Check if a pop-up is visible AND if the click happened outside of it.
    // The .closest('.level-container') checks if the click's ancestor is the level container.
    if (activePopup && !activePopup.closest('.level-container').contains(event.target)) {
    // If the click was outside, hide the pop-up.
    activePopup.classList.remove('active');
    }
  });

}