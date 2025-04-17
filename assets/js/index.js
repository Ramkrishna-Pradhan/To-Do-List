const container = document.querySelector("#task-box");
const input = document.querySelector(".input");
const progress = document.querySelector("#grid2");
const complete = document.querySelector("#grid3");
const notcomplete = document.querySelector("#grid1");
const datetime = document.querySelector("#userDateTime");
const secondform = document.querySelector(".second-form");
const crossicon=document.querySelector(".fa-circle-xmark");



secondform.style.display = "none";


// fetch navbar
(async function () {
    try {
        const response = await fetch('./components/header.html');
        const data = await response.text();
        document.querySelector(".head-item").innerHTML = data;
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
})();


function addtask() {
    if (input.value === "") {
        alert("you must be write something!");
    }
    else {
        const section = document.createElement("section");
        const para = document.createElement("p");
        const buttoncontainer = document.createElement("button-container");

        // create close button
        const button = document.createElement("button");
        button.innerHTML = "Close";
        button.className = "button button1";

        // create strat button
        const startbutton = document.createElement("button");
        startbutton.innerHTML = "Start";
        startbutton.className = "button button2";

        // create done button
        const donebutton = document.createElement("button");
        donebutton.innerHTML = "Done";
        donebutton.className = "button button3";

        // create set button
        const setbutton = document.createElement("button");
        setbutton.innerHTML = "set";
        setbutton.className = "button set";

        para.innerHTML = input.value;
        buttoncontainer.appendChild(button);
        buttoncontainer.appendChild(startbutton);
        section.appendChild(para);
        section.appendChild(buttoncontainer);
        container.appendChild(section);

        // delete task.....
        button.addEventListener("click", () => {
            alert("Are you sure delete this task");
            if (alert) {
                section.remove();
                localStorage.removeItem("data");
            }
        });

        let donetask=false;

        // start task......
        startbutton.addEventListener("click", () => {
            secondform.style.display = "";
            secondform.appendChild(setbutton);
            crossicon.addEventListener("click",()=>{
                secondform.style.display = "none";
            })

            // set time....
            setbutton.addEventListener("click", () => {

                const userInput = document.getElementById('userDateTime').value;
                const userDateTime = new Date(userInput).getTime();

                if (!userInput) {
                    alert("Please enter a valid date and time.");
                    return;
                }
                else {
                    progress.appendChild(section);
                    buttoncontainer.removeChild(startbutton);
                    buttoncontainer.appendChild(donebutton);
                    secondform.style.display = "none";
                    secondform.removeChild(setbutton);

                    // window.onload = function() {
                    //     const localData = localStorage.getItem("data");
                    //     if (localData) {
                    //         progress.innerHTML = localData; // Display the saved content
                    //     }
                    // };
            
                    //     const storeData = section.outerHTML; // Get the outer HTML of the section
                    //     localStorage.setItem("data", storeData); // Save content to localStorage
                    //     progress.innerHTML = storeData; // Update displayed section
                    

                    // create div which show date and time
                    const div = document.createElement("div1");
                    div.innerHTML = `${userInput}`;
                    section.prepend(div);

                    const timer = setInterval(function () {
                        const now = new Date().getTime();

                        if(donetask){
                            clearInterval(timer);
                            return;
                        }

                        if (now >= userDateTime) {
                            clearInterval(timer);
                            notcomplete.appendChild(section);
                            buttoncontainer.removeChild(donebutton);
                        }
                    }, 1000);
                }

            });
        });


        // done task.......
        donebutton.addEventListener("click", () => {
            donetask=true;
            complete.appendChild(section);
            buttoncontainer.removeChild(donebutton);
        });

    }
    input.value = "";
}



