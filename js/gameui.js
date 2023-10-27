// inicializar elementos del DOM
const dialogTextElement = document.getElementById("text");
const nextButtonElement = document.getElementById("next-btn");

let nextBtn = document.createElement("button");
nextBtn.textContent = "Siguiente";
nextButtonElement.append(nextBtn);

dialogTextElement.innerText = "";



// aqui van las velocidades de texto para un mayor control de la narrativa
const speedMapping = {
    slow: 50,    // 50 milisegundos por caracter
    medium: 25,  // 25 milisegundos por caracter
    fast: 5     // 2 milisegundos por caracter
};


export function showAlertText(text, speed, isLastDialog) {
    return new Promise((resolve) => {
        const textElement = document.getElementById("text");
        const nextButtonElement = document.getElementById("next-btn");
        function showTextWithSpeed() {
            let charIndex = 0;
            const interval = setInterval(function() {
                if (charIndex < text.length) {
                    textElement.textContent += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(interval);

                    if (!isLastDialog) {
                        nextButtonElement.style.display = "block";
                        nextButtonElement.addEventListener("click", () => {
                            nextButtonElement.style.display = "none";
                            nextButtonElement.removeEventListener("click", showNextText);
                            resolve(); // Resuelve la promesa al hacer clic en "next-btn"
                        });
                    } else {
                        nextButtonElement.style.display="none"; 
                    }
                }
            }, speedMapping[speed]);
        }

    function showNextText() {
        nextButtonElement.style.display = "none";
        nextButtonElement.removeEventListener("click", showNextText);

        if (!isLastDialog) {
            showTextWithSpeed();
        }

        // Ejemplo: Espera 3 segundos antes de mostrar otro texto
        // ...

        if (isLastDialog) {
            resolveNext();
        }
    }

    textElement.textContent = "";
    textElement.textContent = "";
        showTextWithSpeed();
    });
}




export function changeImage(imagenSeleccionada) {
    const img = document.getElementById("visuals");
    if (img) {
        switch (imagenSeleccionada) {
            case 'img1':
                img.src = "./img/img1.png"; // Ruta de la primera imagen
                break;
            case 'img2':
                img.src = "./img/img2.png"; // Ruta de la segunda imagen
                break;
            case 'img3':
                img.src = "./img/img3.png"; // Ruta de la segunda imagen
                break;
        
                case 'img4':
                    img.src = "./img/img4.png"; // Ruta de la segunda imagen
                    break;
            case 'battle1':
                    img.src = "./img/battle1.png"; // Ruta de la segunda imagen
                    break; // Agrega más casos según tus necesidades    
             case 'battle2':
                    img.src = "./img/battle2.png"; // Ruta de la segunda imagen
                    break; // Agrega más casos según tus necesidades     
          case 'battle3':
                        img.src = "./img/battle3.png"; // Ruta de la segunda imagen
                        break; // Agrega más casos según tus necesidades     
         case 'battle4':
                        img.src = "./img/battle3.png"; // Ruta de la segunda imagen
                         break; // Agrega más casos según tus necesidades     
         case 'defeat':
                            img.src = "./img/defeat.png"; // Ruta de la segunda imagen
                            break; // Agrega más casos según tus necesidades     
        case 'escape':
                                img.src = "./img/escape.png"; // Ruta de la segunda imagen
                                break; // Agrega más casos según tus necesidades     
                 case 'victory':
                                img.src = "./img/victory.png"; // Ruta de la segunda imagen
                                 break; // Agrega más casos según tus necesidades          
         case 'potion':
                             img.src = "./img/potion.png"; // Ruta de la segunda imagen
                              break; // Agrega más casos según tus necesidades    
            case 'treasure':
                                img.src = "./img/treasure.png"; // Ruta de la segunda imagen
                                break; // Agrega más casos según tus necesidades     
                 case 'treasuregood':
                                img.src = "./img/treasuregood.png"; // Ruta de la segunda imagen
                                 break; // Agrega más casos según tus necesidades     
                 case 'level1':
                                    img.src = "./img/level1.png"; // Ruta de la segunda imagen
                                    break; // Agrega más casos según tus necesidades     
                case 'level2':
                                        img.src = "./img/level2.png"; // Ruta de la segunda imagen
                                        break; // Agrega más casos según tus necesidades     
                         case 'level3':
                                        img.src = "./img/level3.png"; // Ruta de la segunda imagen
                                         break; // Agrega más casos según tus necesidades          
          
            default:
                // Si el parámetro no coincide con ninguna opción, puedes no hacer nada o mostrar una imagen por defecto
             break;
        }
    }
}