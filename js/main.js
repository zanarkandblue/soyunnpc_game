
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
        
    attack (zombie){
            alert("¡"+this.name+" usa su "+this.arm_equip+" para atacar!");
            zombie.hp=zombie.hp-this.atk;
            if(zombie.hp<=0){
              zombie.alive=false;
              this.kill_count++;
              alert("¡"+zombie.name+" ha muerto!");
            }

            else
            {
                alert("¡Un gran golpe pero "+zombie.name+" sigue vivo!");
            }
        }

    escape(zombie){ 
            alert("¡"+this.name+" se rueda por debajo de las piernas de "+zombie.name+" con la intención de escapar!");
            zombie.agil=zombie.agil-this.agil;
            if(zombie.agil<=0){
                this.escape_count++;
                alert("¡"+this.name+" ha logrado escapar!");
            }else{
            alert("¡"+zombie.name+" se agacha y le bloquea el paso!");
            }
        }
    
 
 


    // metodos para ubicar y mover al personaje en el GameMap generado
    move_prompt(GameMap){
        const available_directions = [];
        // const current_position = this.getPosition(GameMap);
        
        if(this.y > 0){
            available_directions.push("A: norte");
        }
        if (this.y < GameMap.sizeY - 1){
            available_directions.push("B: sur");
        }
        if (this.x < GameMap.sizeX -1){
            available_directions.push("C: este");
        }
        if (this.x > 0){
            available_directions.push("D: oeste");
        }

        alert(npc.name+" se encuentra en "+GameMap.map_name+". Mira alrededor y tiene "+available_directions.length+" caminos.");
        let user_choice = prompt("¿Qué camino tomarás? "+available_directions.join(", ")).toUpperCase();
        
        switch (user_choice) {
            case "A":  
                this.move(GameMap, "norte");
                
            break;

            case "B":  
            this.move(GameMap, "sur");
            break;

            case "C":
      
            this.move(GameMap, "este");
               
            break;

            case "D":
     
            this.move(GameMap, "oeste");
               
            break;
        
            default:
                alert("Esa no es una opción válida. ¿Te encuentras bien?");
                this.move_prompt(GameMap)
            break;
        }
  
}

    move(GameMap, user_choice){
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
                    alert("Has regresado al punto de inicio. ¡Estás yendo en círculos!");
                    this.move_prompt(GameMap);
                    break;
                case "empty":
                    alert("Has avanzado hacia una casilla vacía.");
                    this.move_prompt(GameMap);
                    break;
        
                case "battle":
                    this.battle();
                    this.move_prompt(GameMap);
                    break;
        
                case "treasure":
                    alert("¡Has encontrado un cofre con provisiones! ¡Al parecer otros NPC han intentado dejar ayuda!")
                    this.treasure();
                    this.move_prompt(GameMap);
                    break;
        
                case "exit":
                    alert("¡Encontraste la salida hacia el siguiente sector!")
                    this.x=0;
                    this.y=0;
                   break;
        
                default:
                    break;
            }
        }
        else {
            alert("Parece que no se puede ir por esa dirección. El paso está bloqueado.");
            this.move_prompt(GameMap);
        }

    }

    isValidPosition (GameMap, x,y){
        const rows = GameMap.map.length;
        const columns = GameMap.map[0].length;
        return x >= 0 && x < columns && y >= 0 && y < rows;
    }

    treasure(){
        const random_num = Math.random();
                    if (random_num < 0.4){
                       this.potion_count++;
                       this.agil++;
                        alert("¡Abriste el cofre y encontraste una poción! ¡Ahora tienes un poquito más de de suerte!");
                    } else if (random_num < 0.6){
                        this.potion_count+=3;
                        this.agil+=3;
                        alert("¡Abriste el cofre y encontraste un pack de 3 pociones! ¡Ahora tienes más buena suerte!");
                    } 
                    else if (random_num < 0.8){
                        this.potion_count+=5;
                        this.agil+=5;
                        alert("¡Qué buena suerte! Abriste el cofre y encontraste un kit para sobrevivientes con 5 pociones. ¡Ganaste mucha buena suerte!");
                    } else {
                        alert("¡Abriste el cofre pero está vacío! Seguro los zombies lo han saqueado. ¡Qué pena!"); ;
                    }
                this.potion();
                alert("¡Sigamos avanzando!")

    }

    battle(){
        alert("¡Ha aparecido un enemigo!")
        const zombie = new Enemy();
        this.battlecount++;
        let victory = false;
            while(zombie.alive==true && this.alive==true && zombie.agil>0){
                
               battle_debug(zombie);
               let battle_choice ="";
               while (battle_choice!="A" && battle_choice != "B" && battle_choice != "C") { 
               let battle_choice= prompt("¡El "+zombie.name+" hambriento de polígonos de NPC está frente a ti! ¿Qué vas a hacer, "+this.name+"?   A: ¡Voy a luchar!   B: Prefiero escapar").toUpperCase();
                    switch (battle_choice){
                    case "A":
                      this.attack(zombie);
                      if (zombie.alive==true){
                        zombie.attack(npc);
            
                        if (this.alive==false){
                            npc_death_end();
                            break;
                        }
                      }
                      else{
                        victory = true;
                        this.battle_results(victory);
                        return;
                      }
                      
                    break;
                    case "B":
                        this.escape(zombie);
                        if (zombie.agil>0){
                            zombie.attack(npc);
                            if (this.alive==false){
                                npc_death_end();
                                return;
                            }
                          }
                        else{
                            this.battle_results(victory);
                            return;
                        }
                    break;
                     default:
                        alert("Esa no es una opción válida. ¿Te encuentras bien?"); 
                    break;
                } }
            } 
    }

    potion (){
        let choice ="";
        while (choice !== "S" && choice !== "N"){
        choice = prompt("Te quedan "+this.hp+" puntos de vida, ¿deseas recuperarte al máximo usando una poción? (Te queda(n) "+this.potion_count+". Ingresa S para si y N para no").toUpperCase();
    
        switch(choice){
                case "S":
                    this.hp=this.max_hp;
                    this.potion_count--;
                    alert("¡"+this.name+" toma la poción y siente una sensación refrescante!");
                break;
                case "N":
                 
                break;
                default:
                    alert("Esa no es una opción válida. ¿Te encuentras bien?");
                break;
                }
          }       
    }
    battle_results(victory){
    
        if (victory == true){
            alert("¡Enhorabuena! Ganaste la batalla. ¡Ahora eres más fuerte!");
            this.atk++;
        }
        else {
            alert("¡Ahora eres más rápido!")
            this.agil++;
        }
        
        if (this.hp<this.max_hp && this.potion_count>0){
               
        this.potion();
        }
    
        alert("¡Sigamos avanzando!");
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

        attack (player){
            alert("¡"+this.name+" intercepta a "+player.name+" y le da una terrible mordida!");
            player.hp=player.hp-this.atk;
            if(player.hp<=0){
              player.alive=false;
              alert("¡"+player.name+" ha sido descuartizado por "+this.name+"!");
            }
            else
            {
              alert(player.name+" sigue vivo!");
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

function game_start () {
    alert("Renderización completa. Despierta, NPC 42.0. ¿Estás listo para morir? ... Hmm. Te preguntarás cómo llegaste aquí.");
    alert("No te preocupes. En esta cabaña estarás a salvo.");
    alert("Has sido generado por la inteligencia artificial de este entorno digital para cumplir la labor de un extra en un videojuego de zombies.");
    alert("Sin embargo, los creadores de este sistema permiten almacenar un nombre en tu metadata. ¿Por qué no te asignas un nombre, NPC?");
    let npcname= "";
    while(npcname.trim().length === 0){
    npcname=prompt("Ingresa tu nombre, NPC:");
    }
    npc.name = npcname; // Asigno el nombre que ingresa el jugador al objeto y lo uso de inmediato
    alert("Un gusto saludarte, "+ npc.name+". Luego de morir tu data quedará almacenada por si algún usuario decide sacar alguna estadística del videojuego. Ahora, es momento de prepararnos contra el ataque de los zombies.");
}

function setup_npc (){
    let setup_choice;
    alert("Elige un arma para prepararte contra el ataque de los zombies.");
    setup_choice = prompt("Elige una acción:    A: Tomar la escopeta    B: Tomar el hacha    C: Usar los puños").toUpperCase();
    
     switch (setup_choice){
        case "A":
            alert("Tomaste la escopeta, genial. Ahora, salgamos de esta cabaña, ¡ya nos toca entrar a escena!");
            npc.atk=7;
            npc.agil=3;
            npc.arm_equip="escopeta";
        break;
        case "B":
            alert("Tomaste el hacha, genial. Ahora, salgamos de esta cabaña, ¡ya nos toca entrar a escena!");
            npc.atk=5;
            npc.agil=2;
            npc.arm_equip="hacha";
        break;
        case "C":
            alert("Prefiste usar los puños para ser más veloz, genial. Ahora, salgamos de esta cabaña, ¡ya nos toca entrar a escena!");
            npc.atk=2;
            npc.agil=10;
            npc.arm_equip="puño";
        break;
        default:
            alert("Esa no es una opción válida. ¿Te encuentras bien?");
            setup_npc();
        break;
    }
    alert("Comenzó la escena. Las calles están repletas de zombies. Solo tienes que avanzar en dirección norte y pelear contra el primer zombie con el que hagas colisión. Así te han programado, "+npc.name+", para morir a pocos segundos de despertar.");
}




function npc_death_end(){
alert("Game Over. El programador de este NPC no ha configurado el respawn automático. FINAL MALO");
end_credits();
}

function intermission1(){
    alert("¡Lograste sobrevivir! El programador de este código ha olvidado programar la destrucción automática de tu NPC. Seguirás en memoria hasta que el jugador apague la videoconsola.");
    alert("¿Qué? ¿Has decidido sobrevivir aún después de que la consola se apague y tus datos se eliminen?");
    alert("¿Te deseo mucha suerte, "+npc.name+". Como inteligencia artificial seguiré asistiendo a los nuevos NPC a cumplir su misión en la escena. Al parecer fui actualizada para sobrevivir a la partida incluso después de que se apague la consola.");
    alert("¿Me preguntas en donde estoy? Creo que será muy dificil encontrarme "+npc.name+". Mira hacia el otro lado de la ciudad donde hay una gran torre. Es la torre Alpha, donde residen los sistemas que controlan este videojuego.");
    alert(npc.name+" mira hacia el otro lado de la ciudad y logra avistar una inmensa torre la cual emite potentes haces de luz a través de unos faros. Al parecer se encuentra muy resguardada.");
    alert(npc.name+", debes atravesar la ciudad y llegar hasta la torre Alpha para conocer más sobre tu origen e intentar impedir tu terrible destino.");
}

function intermission2(){
    alert("Enhorabuena, "+npc.name+". Has logrado acercarte más a tu destino.");
    alert("Como podrás darte cuenta, hay varios sectores en esta ciudad abandonada. Estoy segura que encontrarás la torre en poco tiempo.");
    alert("La mayoría de calles están infestadas de zombies, pero hay algunas calles que parece que son seguras. ¡Todo depende de tu suerte!");
    alert("Incluso hay algunas calles que tienen cofres con provisiones dejadas por otros npc que te serán muy útiles para sobrevivir. Intenta encontrar la mayor cantidad de ellas!");
    alert("¡Sigamos avanzando hacia la torre Alpha!");
}

function intermission3(){
    alert("¡Llegamos a la Plaza Central!");
    alert("La torre Alpha está muy cerca. ¿Puedes verla desde aquí?");
    alert("¿Quieres saber más sobre mi? Mi nombre es Electra, soy una inteligencia artificial cuya misión es guiar a otros NPC a cumplir su misión en la escena.");
    alert("¿Me estás preguntando por qué sobreviviré luego de que apaguen la consola y tu no? Me temo que esa información es reservada. Será mejor que sigamos avanzando hacia la torre Alpha.");
}

function intermission4(){
    alert("¡Llegamos a la Torre Alpha!");
    alert("Cada vez más cerca de conocer la verdad, "+npc.name+".");
    alert("Para serte sincera, pocos NPC han llegado tan cerca. Estoy orgullosa de ti.");
    alert("Ha sido una partida larga, ¿Por qué no te tomas un descanso?");
    alert("La videoconsola empieza a entrar en modo reposo. ¿Podrá "+npc.name+" sobrevivir? - CONTINUARÁ");
}

function end_credits(){
alert("¡FIN DE LA DEMO!");
alert("Gracias por jugar a SOY UN NPC - Una aventura conversacional. Pronto agregaré más funciones y contenido a este pequeño juego. Sigueme en IG: soyunnpc42.0");
restart_game();
}

function restart_game(){
 let restart_choice = prompt("¿Quieres jugar de nuevo?. Ingresa S para si y N para no").toUpperCase();
 switch(restart_choice){
    case "S":
        location.reload();
    break;
    case "N":
        alert("Bye!");
    break;
       default:
          alert("Esa no es una opción válida. ¿Te encuentras bien?");
          restart_game();
      break;
 }
}
    
function battle_debug(zombie){
    console.log("JUGADOR--------")    
    console.log("Nombre: "+npc.name);
    console.log("HP: "+npc.hp);
    console.log("Ataque: "+npc.atk);
    console.log("Agilidad: "+npc.agil);
    console.log("Arma elegida: "+npc.arm_equip);
    console.log("ENEMIGO--------")
    console.log("HP: "+zombie.hp);
    console.log("Agilidad: "+zombie.agil);
    console.log("Ataque: "+zombie.atk);
}

function mission1(){
    const level1 = new GameMap("default", "la Ciudad Olvidada"); // sintaxis: GameMap("default/random", "nombre del mapa", "filas", "columnas")
    console.log(level1.map);
    npc.move_prompt(level1);
}

function mission2(){
    const level2 = new GameMap("random", "los suburbios",4,4); // sintaxis: GameMap("default/random", "nombre del mapa", "filas", "columnas")
    console.log(level2.map);
    npc.move_prompt(level2);
}

function mission3(){
    const level3 = new GameMap("random", "la Plaza Central",5,5); // sintaxis: GameMap("default/random", "nombre del mapa", "filas", "columnas")
    console.log(level3.map);
    npc.move_prompt(level3);
}


// EJECUCION DEL JUEGO
const npc = new Player(); //aqui instancio el objeto del jugador (que se llama "npc" por defecto)

game_start(); 
setup_npc(); // modificacion de stats del personaje en funcion al arma equipada
npc.battle(); // primera batalla
intermission1(); 
mission1();
intermission2();
mission2();
intermission3();
mission3();
intermission4();
end_credits();




