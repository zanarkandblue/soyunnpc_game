import {showAlertText} from "./gameui.js";
import {changeImage} from "./gameui.js";


class Player {
    constructor (){
        this.name = "npc";
        this.level = 1;
        this.hp = 15;
        this.max_hp = 15;
        this.atk = 0;
        this.agil = 0;
        this.exp = 0;
        this.alive=true;
        this.arm_equip = "";
        this.kill_count = 0;
        this.escape_count = 0;
        this.potion_count = 1;
        this.battle_count = 0;
        this.x = 0;
        this.y = 0;
        }
        
    async attack (zombie){
        changeImage("battle3");    
        await showAlertText("¡"+this.name+" usa su "+this.arm_equip+" para atacar!");
            zombie.hp=zombie.hp-this.atk;
            if(zombie.hp<=0){
              zombie.alive=false;
              this.kill_count++;
              killCountElement.innerText = npc.kill_count;
              localStorage.setItem("killCountStorage",this.kill_count);
              changeImage("victory");
              await showAlertText("¡"+zombie.name+" ha muerto!");
            }

            else
            {
                await showAlertText("¡Un gran golpe pero "+zombie.name+" sigue vivo!");
            }
        }

    async escape(zombie){ 
        changeImage("battle4");
            await showAlertText("¡"+this.name+" se rueda por debajo de las piernas de "+zombie.name+" con la intención de escapar!");
            zombie.agil=zombie.agil-this.agil;
            if(zombie.agil<=0){
                this.escape_count++;
                changeImage("escape");
                await showAlertText("¡"+this.name+" ha logrado escapar!");
            }else{
            await showAlertText("¡"+zombie.name+" se agacha y le bloquea el paso!");
            }
        }
    
 
 


    // metodos para ubicar y mover al personaje en el GameMap generado
    async move_prompt(GameMap){
        const available_directions = [];
        
        
        if(this.y > 0){
            available_directions.push("Norte");
        }
        if (this.y < GameMap.sizeY - 1){
            available_directions.push("Sur");
        }
        if (this.x < GameMap.sizeX -1){
            available_directions.push("Este");
        }
        if (this.x > 0){
            available_directions.push("Oeste");
        }
        switch (GameMap.map_name) {
            case "la Ciudad Olvidada":
                changeImage("level1");
                break;
        
                case "los suburbios":
                    changeImage("level2");
                break;

                case "la Plaza Central":
                    changeImage("level3");
                break;


            default:
                break;
        }
        await showAlertText(npc.name+" se encuentra en "+GameMap.map_name+". Mira alrededor y tiene "+available_directions.length+" caminos:");
        let user_choice;
        await Swal.fire({
            title: '¿Qué camino tomarás?',
            input: 'radio',
            allowOutsideClick: false,
            inputOptions: available_directions,
            inputValidator: (value) => {
              if (!value) {
                return 'Esa no es una opción válida, ¿te encuentras bien?'
              }
            }
         })
         const selectedOption = available_directions.find((_, index) => index === parseInt(Swal.getInput().value));
         user_choice = selectedOption;
        

        switch (user_choice) {
            case "Norte":  
                await this.move(GameMap, "norte");
                
            break;

            case "Sur":  
             await this.move(GameMap, "sur");
            break;

            case "Este":
      
            await this.move(GameMap, "este");
               
            break;

            case "Oeste":
     
            await this.move(GameMap, "oeste");
               
            break;
        
            default:
                await showAlertText("Esa no es una opción válida. ¿Te encuentras bien?");
                await this.move_prompt(GameMap)
            break;
        }
  
}

    async move(GameMap, user_choice){
        let newX = this.x;
        let newY = this.y;
        switch (user_choice) {
            case "norte":
                newY--;
            break;

            case "sur":
                newY++;
            break;

            case "este":
                newX++;
            break;

            case "oeste":
                newX--;
            break;
            default:
                break;
        }
        if (this.isValidPosition(GameMap,newX, newY)){
            
            this.x=newX;
            this.y=newY;


            const tile_check = GameMap.map[newY][newX];
            switch (tile_check) {
                case "player":
                    await showAlertText("Has regresado al punto de inicio. ¡Estás yendo en círculos!");
                    await this.move_prompt(GameMap);
                    break;
                case "empty":
                    await showAlertText("Has avanzado hacia una casilla vacía.");
                    await this.move_prompt(GameMap);
                    break;
        
                case "battle":
                    GameMap.map[newY][newX]="empty";    
                    await this.battle();
                    await this.move_prompt(GameMap);
                    break;
        
                case "treasure":
                    GameMap.map[newY][newX]="empty"; 
                    changeImage("treasure");
                    await showAlertText("¡Has encontrado un cofre con provisiones! ¡Al parecer otros NPC han intentado dejar ayuda!")
                    await this.treasure();
                    await this.move_prompt(GameMap);
                    break;
        
                case "exit":
                    await showAlertText("¡Encontraste la salida hacia el siguiente sector!")
                    this.x=0;
                    this.y=0;
                   break;
        
                default:
                    break;
            }
        }
        else {
            await showAlertText("Parece que no se puede ir por esa dirección. El paso está bloqueado.");
            await this.move_prompt(GameMap);
        }

    }

    async isValidPosition (GameMap, x,y){
        const rows = GameMap.map.length;
        const columns = GameMap.map[0].length;
        return x >= 0 && x < columns && y >= 0 && y < rows;
    }

    async treasure(){
        const random_num = Math.random();
                    if (random_num < 0.4){
                       this.potion_count++;
                       this.agil++;
                       changeImage("treasuregood");
                        await showAlertText("¡Abriste el cofre y encontraste una poción! ¡Ahora tienes un poquito más de de suerte!");
                    } else if (random_num < 0.6){
                        this.potion_count+=3;
                        this.agil+=3;
                        changeImage("treasuregood");
                        await showAlertText("¡Abriste el cofre y encontraste un pack de 3 pociones! ¡Ahora tienes más buena suerte!");
                    } 
                    else if (random_num < 0.8){
                        this.potion_count+=5;
                        this.agil+=5;
                        changeImage("treasuregood");
                        await showAlertText("¡Qué buena suerte! Abriste el cofre y encontraste un kit para sobrevivientes con 5 pociones. ¡Ganaste mucha buena suerte!");
                    } else {
                        await showAlertText("¡Abriste el cofre pero está vacío! Seguro los zombies lo han saqueado. ¡Qué pena!"); ;
                    }
                   
                 if (this.hp<this.max_hp && this.potion_count>0){
                      await this.potion();
                        }
                    
                await showAlertText("¡Sigamos avanzando!")

    }

    async battle(){
        changeImage("battle1");
        await showAlertText("¡Ha aparecido un enemigo!");
        const zombie = new Enemy();
        this.battlecount++;
        let victory = false;
            while(zombie.alive==true && this.alive==true && zombie.agil>0){
                
              
                changeImage("battle2");
               await showAlertText("¡El "+zombie.name+" hambriento de polígonos de NPC está frente a ti! ¿Qué vas a hacer, "+npc.name+"?", "fast", false);
              
               
               let user_choice;
               const { value: text } = await Swal.fire({
                   title: 'Elige una opción',
                   input: 'radio',
                   allowOutsideClick: false,
                   inputOptions: {
                       A: 'Quiero luchar 💥',
                       B: 'Prefiero escapar 🏃‍♂️',
                      },
                   inputValidator: (value) => {
                     if (!value) {
                       return 'Esa no es una opción válida, ¿te encuentras bien?'
                     }
                   }
                })
                user_choice = text;
              

              
               
               switch (user_choice){
                    case "A":
                      await this.attack(zombie);
                      if (zombie.alive==true){
                        await zombie.attack(npc);
            
                        if (this.alive==false){
                            await npc_death_end();
                            break;
                        }
                      }
                      else{
                        victory = true;
                        await this.battle_results(victory);
                        return;
                      }
                      
                    break;
                    case "B":
                        await this.escape(zombie);
                        if (zombie.agil>0){
                            await zombie.attack(npc);
                            if (this.alive==false){
                                await npc_death_end();
                                return;
                            }
                          }
                        else{
                            await this.battle_results(victory);
                            return;
                        }
                    break;
                     default:
                        await showAlertText("Esa no es una opción válida. ¿Te encuentras bien?"); 
                    break;
                } 
            }
             
    }

    async potion (){
        changeImage("potion");
        await showAlertText("Te quedan "+this.hp+" puntos de vida");
        let choice ="";
                const { value: text } = await Swal.fire({
                   title: '¿Recuperarte con una poción? 🤍 (te quedan '+this.potion_count+').',
                   input: 'radio',
                   allowOutsideClick: false,
                   inputOptions: {
                       S: 'Si',
                       N: 'No',
                      },
                   inputValidator: (value) => {
                     if (!value) {
                       return 'Esa no es una opción válida, ¿te encuentras bien?'
                     }
                   }
                })
                choice = text;
    
        switch(choice){
                case "S":
                    this.hp=this.max_hp;
                    this.potion_count--;
                    await showAlertText("¡"+this.name+" toma la poción y siente una sensación refrescante!");
                break;
                case "N":
                 
                break;
                default:
                    await showAlertText("Esa no es una opción válida. ¿Te encuentras bien?");
                break;
                }
                 
    }
    async battle_results(victory){
    
        if (victory == true){
            await showAlertText("¡Enhorabuena! Ganaste la batalla. ¡Ahora eres más fuerte!");
            this.atk++;
        }
        else {
            await showAlertText("¡Ahora eres más rápido!")
            this.agil++;
        }
        
        if (this.hp<this.max_hp && this.potion_count>0){
               
        await this.potion();
        }
    
        await showAlertText("¡Sigamos avanzando!");
      }
}

class Enemy {
    constructor (){
        this.name = "Zombie";
        this.level = 1;
        this.hp = 20;
        this.atk = 5;
        this.agil = 12;
        this.alive=true;
        }

     async    attack (player){
            await showAlertText("¡"+this.name+" intercepta a "+player.name+" y le da una terrible mordida!");
            player.hp=player.hp-this.atk;
            if(player.hp<=0){
              player.alive=false;
              changeImage("defeat");
              await showAlertText("¡"+player.name+" ha sido descuartizado por "+this.name+"!");
            }
            else
            {
              await showAlertText(player.name+" sigue vivo!");
            }
        }
}

class GameMap{
    constructor (type, map_name, rows, columns){
       if (type === "default"){
        this.map = [
            ["player","empty","empty"],
            ["battle","empty","battle"],
            ["treasure","battle","exit"],
            ];
        this.sizeX = 3;
        this.sizeY = 3;
        this.map_name = map_name;
        } 
        else if (type === "random" && rows > 2 && columns > 2) {
            this.mapGenerator(map_name,rows,columns);
            // nota mental: agregar validaciones de rows y columns en caso el jugador quiera crear un mapa personalizado en una proxima version
        } else {
            alert("El mapa no se pudo generar. Vuelve a intentarlo");
        }
    }

    mapGenerator(map_name,rows,columns){
        this.map = [];
        this.sizeX = rows;
        this.sizeY = columns;
        this.map_name = map_name;
        for (let i = 0; i < this.sizeY; i++){
            const row=[];
            for (let j=0; j < this.sizeX; j++){
                if (i===0&&j===0){
                    row.push("player");
                } else if (i === this.sizeY -1 && j === this.sizeX -1) {
                    row.push("exit");
                } else {
                    const random_num = Math.random();
                    if (random_num < 0.3){
                        row.push("empty");
                    } else if (random_num < 0.4){
                        row.push("treasure");
                    } else {
                        row.push("battle");
                    }

                }
            }
            this.map.push(row);
        }   
    }


}



async function game_start () {
    await showAlertText("Renderización completa. Despierta, NPC 42.0. ¿Estás listo para morir? ... Hmm. Te preguntarás cómo llegaste aquí.", "fast", false);
    await showAlertText("Has sido generado por la inteligencia artificial de este entorno digital para cumplir la labor de un extra en un videojuego de zombies. 🧟‍♂️");
    changeImage("img2");
    await showAlertText("No te preocupes. En esta cabaña estarás a salvo.");
    await showAlertText("Sin embargo, los creadores de este sistema permiten almacenar un nombre en tu metadata. ¿Por qué no te asignas un nombre, NPC?");
 

    const { value: text } = await Swal.fire({
        title: 'Inicialización',
        input: 'text',
        inputLabel: 'Ingresa un nombre, NPC',
        inputPlaceholder: 'Non Playable Character',
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (!value) {
              return "Escribe un nombre válido o será más dificil identificarte"
            }
          }
      })
    
    npc.name = text;


    await showAlertText("Un gusto saludarte, "+ npc.name+". Luego de morir tu data quedará almacenada por si algún usuario decide sacar alguna estadística del videojuego. Ahora, es momento de prepararnos contra el ataque de los zombies.");
}

async function setup_npc (){
    await showAlertText("Elige un arma para prepararte contra el ataque de los zombies.");
    let setup_choice;
    let weapons; 
        // Cargar el archivo JSON de armas
   fetch('/json/weapons.json')
   .then((response) => response.json())
   .then((weaponsData) => {
   // Ahora puedes acceder a los datos de armas en weaponsData
   weapons = weaponsData;
   })
   .catch((error) => {
   console.error('Error al cargar el archivo de armas JSON: ' + error);
   });

    const { value: text } = await Swal.fire({
        title: 'Elige una opción',
        input: 'radio',
        allowOutsideClick: false,
        inputOptions: {
            A: 'Tomar la escopeta 🔫',
            B: 'Tomar el hacha 🪓',
            C: 'Usar los puños 👊',
          },
        inputValidator: (value) => {
          if (!value) {
            return 'Esa no es una opción válida, ¿te encuentras bien?'
          }
        }
     })
     setup_choice = text;
           
     switch (setup_choice){
        case "A":
            await showAlertText("Tomaste la "+weapons[2].name+", genial. Ahora, salgamos de esta cabaña, ¡ya nos toca entrar a escena!");
            npc.atk=weapons[2].power;
            npc.agil=5;
            npc.arm_equip=weapons[2].name;
        break;
        case "B":
            await showAlertText("Tomaste el "+weapons[1].name+", genial. Ahora, salgamos de esta cabaña, ¡ya nos toca entrar a escena!");
            npc.atk=weapons[1].power;
            npc.agil=8;
            npc.arm_equip=weapons[1].name;
        break;
        case "C":
            await showAlertText("Prefiste usar tu "+weapons[0].name+" para ser más veloz, genial. Ahora, salgamos de esta cabaña, ¡ya nos toca entrar a escena!");
            npc.atk=weapons[0].power;
            npc.agil=15;
            npc.arm_equip=weapons[0].name;
        break;
        default:
            await showAlertText("Esa no es una opción válida. ¿Te encuentras bien?");
            setup_npc();
        break;
    }
    changeImage("img3");
    await showAlertText("Comenzó la escena. Las calles están repletas de zombies. Solo tienes que avanzar en dirección norte y pelear contra el primer zombie con el que hagas colisión. Así te han programado, "+npc.name+", para morir a pocos segundos de despertar.");
}




async function npc_death_end(){
await showAlertText("Game Over. El programador de este NPC no ha configurado el respawn automático. FINAL MALO");
await end_credits();
}

async function intermission1(){
    await showAlertText("¡Lograste sobrevivir! El programador de este código ha olvidado programar la destrucción automática de tu NPC. Seguirás en memoria hasta que el jugador apague la videoconsola.");
    await showAlertText("¿Qué? ¿Has decidido sobrevivir aún después de que la consola se apague y tus datos se eliminen?");
    await showAlertText("¿Te deseo mucha suerte, "+npc.name+". Como inteligencia artificial seguiré asistiendo a los nuevos NPC a cumplir su misión en la escena. Al parecer fui actualizada para sobrevivir a la partida incluso después de que se apague la consola.");
    await showAlertText("¿Me preguntas en donde estoy? Creo que será muy dificil encontrarme "+npc.name+". Mira hacia el otro lado de la ciudad donde hay una gran torre. Es la torre Alpha, donde residen los sistemas que controlan este videojuego.");
    changeImage("img4");
    await showAlertText(npc.name+" mira hacia el otro lado de la ciudad y logra avistar una inmensa torre la cual emite potentes haces de luz a través de unos faros. Al parecer se encuentra muy resguardada.");
    await showAlertText(npc.name+", debes atravesar la ciudad y llegar hasta la torre Alpha para conocer más sobre tu origen e intentar impedir tu terrible destino.");
}

async function intermission2(){
    await showAlertText("Enhorabuena, "+npc.name+". Has logrado acercarte más a tu destino.");
    await showAlertText("Como podrás darte cuenta, hay varios sectores en esta ciudad abandonada. Estoy segura que encontrarás la torre en poco tiempo.");
    await showAlertText("La mayoría de calles están infestadas de zombies, pero hay algunas calles que parece que son seguras. ¡Todo depende de tu suerte!");
    await showAlertText("Incluso hay algunas calles que tienen cofres con provisiones dejadas por otros npc que te serán muy útiles para sobrevivir. Intenta encontrar la mayor cantidad de ellas!");
    await showAlertText("¡Sigamos avanzando hacia la torre Alpha!");
}

async function intermission3(){
    await showAlertText("¡Llegamos a la Plaza Central!");
    await showAlertText("La torre Alpha está muy cerca. ¿Puedes verla desde aquí?");
    await showAlertText("¿Quieres saber más sobre mi? Mi nombre es Electra, soy una inteligencia artificial cuya misión es guiar a otros NPC a cumplir su misión en la escena.");
    await showAlertText("¿Me estás preguntando por qué sobreviviré luego de que apaguen la consola y tu no? Me temo que esa información es reservada. Será mejor que sigamos avanzando hacia la torre Alpha.");
}

async function intermission4(){
    await showAlertText("¡Llegamos a la Torre Alpha!");
    await showAlertText("Cada vez más cerca de conocer la verdad, "+npc.name+".");
    await showAlertText("Para serte sincera, pocos NPC han llegado tan cerca. Estoy orgullosa de ti.");
    await showAlertText("Ha sido una partida larga, ¿Por qué no te tomas un descanso?");
    await showAlertText("La videoconsola empieza a entrar en modo reposo. ¿Podrá "+npc.name+" sobrevivir? - CONTINUARÁ");
}

async function end_credits(){
await showAlertText("¡FIN DE LA DEMO!");
await showAlertText("Gracias por jugar a SOY UN NPC - Una aventura conversacional. Pronto agregaré más funciones y contenido a este pequeño juego. Sigueme en IG: soyunnpc42.0");
await restart_game();
}

async function restart_game(){
 let choice ="";
 const { value: text } = await Swal.fire({
    title: '¿Reiniciar el juego?',
    input: 'radio',
    allowOutsideClick: false,
    inputOptions: {
        S: 'Si',
        N: 'No',
       },
    inputValidator: (value) => {
      if (!value) {
        return 'Esa no es una opción válida, ¿te encuentras bien?'
      }
    }
 })
 choice = text;
 
 
 switch(choice){
    case "S":
        await location.reload();
    break;
    case "N":
        await showAlertText("Bye!", "slow", true);
        break;
   
       default:
          await showAlertText("Esa no es una opción válida. ¿Te encuentras bien?");
          restart_game();
      break;
 }
}
    


async function mission1(){
    const level1 = new GameMap("default", "la Ciudad Olvidada"); // sintaxis: GameMap("default/random", "nombre del mapa", "filas", "columnas")
    console.log(level1.map);
    await npc.move_prompt(level1);
}

async function mission2(){
    const level2 = new GameMap("random", "los suburbios",4,4); // sintaxis: GameMap("default/random", "nombre del mapa", "filas", "columnas")
    console.log(level2.map);
    await npc.move_prompt(level2);
}

async function mission3(){
    const level3 = new GameMap("random", "la Plaza Central",5,5); // sintaxis: GameMap("default/random", "nombre del mapa", "filas", "columnas")
    console.log(level3.map);
    await npc.move_prompt(level3);
}


// EJECUCION DEL JUEGO
const npc = new Player(); //aqui instancio el objeto del jugador (que se llama "npc" por defecto)
npc.kill_count=localStorage.getItem("killCountStorage");
const killCountElement = document.getElementById("killCountText")
killCountElement.innerText = npc.kill_count;



await game_start(); 
await setup_npc(); // modificacion de stats del personaje en funcion al arma equipada
await npc.battle(); // primera batalla
await intermission1(); 
await mission1();
await intermission2();
await mission2();
await intermission3();
await mission3();
await intermission4();
await end_credits();




