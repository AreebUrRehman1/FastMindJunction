  const box = document.querySelectorAll(".first-section-grid .box");
  const box2 = document.querySelector(".second-section-grid");

  // This loop was created to display second-section-grid
  box.forEach((separatedBox)=>{

    separatedBox.addEventListener("click",()=>{
        let boxText2 = separatedBox.querySelector('.box-text2');

        box.forEach((removecolors) => {
          removecolors.classList.remove('lightgreyBC-whiteFC');
          const removeboxText2Color = removecolors.querySelector('.box-text2')
          removeboxText2Color.classList.remove('whitesmokeFC');
        })

        separatedBox.classList.add('lightgreyBC-whiteFC');
        
        //This was created to make sure the color on the text-box2 was add.
        boxText2.classList.add('whitesmokeFC');

        //Displaying the right information for the right box clicked
        //START ---

        let box2HTML = ``;

        //Physics
        if(separatedBox.classList.contains('phybox') === true){
          box2HTML = `
            <div class="box">
              <div class="box-text">WPH11</div>
              <div class="box-text2">6 Topics</div>
            </div>
            <div class="box">
              <div class="box-text ">WPH12</div>
              <div class="box-text2">Coming Soon</div>
            </div>
            <div class="box">
              <div class="box-text">WPH13</div>
              <div class="box-text2">Coming Soon</div>
            </div>
            <div class="box">
              <div class="box-text">WPH14</div>
              <div class="box-text2">Coming Soon</div>    
            </div>
            <div class="box">
              <div class="box-text">WPH15</div>
              <div class="box-text2">Coming Soon</div>    
            </div>
            <div class="box">
              <div class="box-text">WPH16</div>
              <div class="box-text2">Coming Soon</div>    
            </div>
          `;

        } 

        //Mathematics
        else if(separatedBox.classList.contains('mathsbox') === true){
          box2HTML = `
            <div class="box">
              <div class="box-text">WMA11</div>
              <div class="box-text2">Coming Soon</div>
            </div>
            <div class="box">
              <div class="box-text ">WMA12</div>
              <div class="box-text2">Coming Soon</div>
            </div>
            <div class="box">
              <div class="box-text">WMA13</div>
              <div class="box-text2">Coming Soon</div>
            </div>
            <div class="box">
              <div class="box-text">WMA14</div>
              <div class="box-text2">Coming Soon</div>    
            </div>
            <div class="box">
              <div class="box-text">WMA15</div>
              <div class="box-text2">Coming Soon</div>    
            </div>
            <div class="box">
              <div class="box-text">WMA16</div>
              <div class="box-text2">Coming Soon</div>    
            </div>
          `;

        } 

        //Information Technology
        else if(separatedBox.classList.contains('itbox') === true){
          box2HTML = `
            <div class="box">
              <div class="box-text">WIT11</div>
              <div class="box-text2">Coming Soon</div>
            </div>
            <div class="box">
              <div class="box-text ">WIT12</div>
              <div class="box-text2">Coming Soon</div>
            </div>
            <div class="box">
              <div class="box-text">WIT13</div>
              <div class="box-text2">Coming Soon</div>
            </div>
            <div class="box">
              <div class="box-text">WIT14</div>
              <div class="box-text2">Coming Soon</div>    
            </div>
            <div class="box">
              <div class="box-text">WIT15</div>
              <div class="box-text2">Coming Soon</div>    
            </div>
            <div class="box">
              <div class="box-text">WIT16</div>
              <div class="box-text2">Coming Soon</div>    
            </div>
            <div class="box">
              <div class="box-text">WIT17</div>
              <div class="box-text2">Coming Soon</div>    
            </div>
            <div class="box">
              <div class="box-text">WIT18</div>
              <div class="box-text2">Coming Soon</div>    
            </div>
          `;

        }

        //Chemistry
        else if(separatedBox.classList.contains('chembox') === true){
          box2HTML = `
            <div class="box">
              <div class="box-text">WCH11</div>
              <div class="box-text2">Coming Soon</div>
            </div>
            <div class="box">
              <div class="box-text ">WCH12</div>
              <div class="box-text2">Coming Soon</div>
            </div>
            <div class="box">
              <div class="box-text">WCH13</div>
              <div class="box-text2">Coming Soon</div>
            </div>
            <div class="box">
              <div class="box-text">WCH14</div>
              <div class="box-text2">Coming Soon</div>    
            </div>
            <div class="box">
              <div class="box-text">WCH15</div>
              <div class="box-text2">Coming Soon</div>    
            </div>
            <div class="box">
              <div class="box-text">WCH16</div>
              <div class="box-text2">Coming Soon</div>    
            </div>
          `;
        } 

        //Biology
        else if(separatedBox.classList.contains('biobox') === true){
          box2HTML = `
            <div class="box">
              <div class="box-text">WB11</div>
              <div class="box-text2">Coming Soon</div>
            </div>
            <div class="box">
              <div class="box-text ">WB12</div>
              <div class="box-text2">Coming Soon</div>
            </div>
            <div class="box">
              <div class="box-text">WB13</div>
              <div class="box-text2">Coming Soon</div>
            </div>
            <div class="box">
              <div class="box-text">WBI14</div>
              <div class="box-text2">Coming Soon</div>    
            </div>
            <div class="box">
              <div class="box-text">WB15</div>
              <div class="box-text2">Coming Soon</div>    
            </div>
            <div class="box">
              <div class="box-text">WBI16</div>
              <div class="box-text2">Coming Soon</div>    
            </div>
          `;

        } 
        //--- END

        box2.innerHTML = box2HTML;
        box2.classList.add('display');
        getComponentfunction();

        //This was created just to display second-section-grid
        box2.classList.add('display');

        // Check for small screens and manually scroll to a fixed position.
        if (window.innerWidth <= 768) {
          box2.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
    });
  });


  //Here we will store the components name, so that it can be worked with later on.
  function getComponentfunction() {

    const componentsList = document.querySelectorAll('.second-section-grid .box');

    componentsList.forEach((separateComponent) => {
      separateComponent.addEventListener('click',() => {
        let componentText = separateComponent.querySelector('.box-text').textContent;
        localStorage.setItem(`subjectComponent`, componentText);
        window.location.href="../physics/physics.html";
      })

    })

  }

