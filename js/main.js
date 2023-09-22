
class Player {
    constructor (){
        this.name = "npc";
        this.level = 1;
        this.hp = 15;
        this.atk = 0;
        this.agil = 0;
        this.exp = 0;
        this.alive=true;
        this.arm_equip = "";
        }
        
    attack (zombie){
            alert("¡"+this.name+" usa su "+this.arm_equip+" para atacar!");
            zombie.hp=zombie.hp-this.atk;
            if(zombie.hp<=0){
              zombie.alive=false;
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
                alert("¡"+this.name+" ha logrado escapar!");
            }else{
            alert("¡"+zombie.name+" se agacha y le bloquea el paso!");
            }
        
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
            console.log(npc);
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


function battle(){
    alert("¡Ha aparecido un enemigo!")
     
        while(zombie.alive==true && npc.alive==true && zombie.agil>0){
            
        battle_menu();
    }
    
}

function battle_menu (){
    battle_debug();
    let battle_choice= prompt("¡El "+zombie.name+" hambriento de polígonos de NPC está frente a ti! ¿Qué vas a hacer, "+npc.name+"?   A: ¡Voy a luchar!   B: Prefiero escapar").toUpperCase();
        switch (battle_choice){
        case "A":
          npc.attack(zombie);
          if (zombie.alive==true){
            zombie.attack(npc);

            if (npc.alive==false){
                npc_death_end();
            }
          }
          else{
            npc_killer_end();
          }
          
        break;
        case "B":
            npc.escape(zombie);
            if (zombie.agil>0){
                zombie.attack(npc);
                if (npc.alive==false){
                    npc_death_end();
                }
              }
            else{
                npc_escape_end();
            }
        break;
         default:
            alert("Esa no es una opción válida. ¿Te encuentras bien?");
            battle_menu(); 
        break;
    }
}



function npc_death_end(){
alert("Game Over. El programador de este NPC no ha configurado el respawn automático. FINAL MALO");
}

function npc_escape_end(){
    alert("¡Lograste escapar y el zombie seguirá yendo hacia la dirección contraria! ¿Y ahora qué? El programador de este código ha olvidado programar la destrucción automática de tu NPC. Seguirás en memoria hasta que el jugador apague la videoconsola.");
    alert("¿Qué? ¿Has decidido sobrevivir aún después de que la consola se apague y los datos de la memoria se eliminen?");
    alert("¿Te deseo mucha suerte, "+npc.name+". Como inteligencia artificial seguiré asistiendo a los nuevos NPC a cumplir su misión en la escena. Al parecer fui actualizado para sobrevivir a la partida incluso después de que se apague la consola.");
    alert(npc.name+" emprende un viaje para sobrevivir y darle un propósito a su ya insignificante existencia. FINAL B");
}

function npc_killer_end(){
    alert("¡Has matado al zombie! Y ahora qué? El programador de este código ha olvidado programar la destrucción automática de tu NPC. Seguirás en memoria hasta que el jugador apague la videoconsola.");
    alert("¿Qué? ¿Has decidido seguir cumpliendo tu función de matar zombies a pesar de solo haber sido programado para luchar contra el primero con el que hagas colisión?");
    alert("¿Te deseo mucha suerte, "+npc.name+". Como inteligencia artificial seguiré asistiendo a los nuevos NPC a cumplir su misión en la escena. Al parecer fui actualizado para sobrevivir a la partida incluso después de que se apague la consola.");
    alert(npc.name+" emprende un viaje para darle un propósito a su ya insignificante existencia. FINAL A");
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
    
function battle_debug(){
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


// EJECUCION DEL JUEGO
const npc = new Player(); //aqui instancio el objeto del jugador (que se llama "npc" por defecto)
const zombie = new Enemy();
game_start(); 
setup_npc(); // modificacion de stats del personaje en funcion al arma equipada
battle();


alert("Gracias por jugar a SOY UN NPC - Una aventura conversacional. Pronto agregaré más funciones y contenido a este pequeño juego. Sigueme en IG: soyunnpc42.0");
restart_game();




