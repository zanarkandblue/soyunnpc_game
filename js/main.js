
let npcname= "";
let hp_npc=15;
let atk_npc;
let agil_npc;
let arm_equip= "";
let hp_zombie;
let agil_zombie;
let atk_zombie;

function game_start () {
    alert("Renderización completa. Despierta, NPC 42.0. ¿Estás listo para morir? ... Hmm. Te preguntarás cómo llegaste aquí.");
    alert("No te preocupes. En esta cabaña estarás a salvo.");
    alert("Has sido generado por la inteligencia artificial de este entorno digital para cumplir la labor de un extra en un videojuego de zombies.");
    alert("Sin embargo, los creadores de este sistema permiten almacenar un nombre en tu metadata. ¿Por qué no te asignas un nombre, NPC?");
    npcname=prompt("Ingresa tu nombre, NPC:");
    alert("Un gusto saludarte, "+ npcname+". Luego de morir tu data quedará almacenada por si algún usuario decide sacar alguna estadística del videojuego. Ahora, es momento de prepararnos contra el ataque de los zombies.");
}

function setup_npc (){
    let setup_choice;
    alert("Elige un arma para prepararte contra el ataque de los zombies.");
    setup_choice = prompt("Elige una acción:    A: Tomar la escopeta    B: Tomar el hacha    C: Usar los puños").toUpperCase();
    
     switch (setup_choice){
        case "A":
            alert("Tomaste la escopeta, genial. Ahora, salgamos de esta cabaña, ¡ya nos toca entrar a escena!");
            atk_npc=7;
            agil_npc=3;
            arm_equip="escopeta";
        break;
        case "B":
            alert("Tomaste el hacha, genial. Ahora, salgamos de esta cabaña, ¡ya nos toca entrar a escena!");
            atk_npc=5;
            agil_npc=2;
            arm_equip="hacha";
        break;
        case "C":
            alert("Prefiste usar los puños para ser más veloz, genial. Ahora, salgamos de esta cabaña, ¡ya nos toca entrar a escena!");
            atk_npc=2;
            agil_npc=10;
            arm_equip="puño";
        break;
        default:
            alert("Esa no es una opción válida. ¿Te encuentras bien?");
            setup_npc();
        break;
    }
    alert("Comenzó la escena. Las calles están repletas de zombies. Solo tienes que avanzar en dirección norte y pelear contra el primer zombie con el que hagas colisión. Así te han programado, "+npcname+", para morir a pocos segundos de despertar.");
    return arm_equip;
}

function generate_enemy(){
    hp_zombie=20;
    agil_zombie=12;
    atk_zombie=5;
}

function battle(){
    alert("¡Ha aparecido un zombie salvaje!")
    let battle_choice;
    //este codigo es para ver el estado de la batalla en consola
        while(hp_zombie>0 && hp_npc>0 && agil_zombie>0){
            
        battle_menu();
    }
    
}

function battle_attack (){
    alert("¡"+npcname+" usa su "+arm_equip+" para atacar!");
    hp_zombie=hp_zombie-atk_npc;
    if(hp_zombie>0){
        battle_receive_damage();
    }
    else{
    alert("¡Zombie ha muerto!");
    npc_killer_end();
    }
}

function battle_receive_damage (){
    switch(battle_choice){
    case "A":
    alert("Un buen golpe, pero no lo ha matado!. Zombie se reincorpora y contraataca a "+npcname+"!");
    break;
    case "B":
    alert("¡Zombie ha interceptado a "+npcname+" y le ha mordido!");
    break;
    default:
    break;
    }
    hp_npc=hp_npc-atk_zombie;
    if (hp_npc >0){
        alert("¡"+npcname+" sigue vivo!")
        battle_debug();
    }else{
        alert("¡"+npcname+" ha sido descuartizado por zombie!")
        battle_debug();
        npc_death_end();
    }
}

function battle_escape (){
    alert("¡"+npcname+" se rueda por debajo de las piernas de zombie con la intención de escapar!");
    agil_zombie=agil_zombie-agil_npc;
    if(agil_zombie>0){
    battle_receive_damage();
    }else{
    alert(npcname+" logró escapar de zombie!")
    npc_escape_end();
    }
}

function npc_death_end(){
alert("Game Over. El programador de este NPC no ha configurado el respawn automático. FINAL MALO");
}

function npc_escape_end(){
    alert("¡Lograste escapar y el zombie seguirá yendo hacia la dirección contraria! ¿Y ahora qué? El programador de este código ha olvidado programar la destrucción automática de tu NPC. Seguirás en memoria hasta que el jugador apague la videoconsola.");
    alert("¿Qué? ¿Has decidido sobrevivir aún después de que la consola se apague y los datos de la memoria se eliminen?");
    alert("¿Te deseo mucha suerte, "+npcname+". Como inteligencia artificial seguiré asistiendo a los nuevos NPC a cumplir su misión en la escena. Al parecer fui actualizado para sobrevivir a la partida incluso después de que se apague la consola.");
    alert(npcname+" emprende un viaje para sobrevivir y darle un propósito a su ya insignificante existencia. FINAL B");
}

function npc_killer_end(){
    alert("¡Has matado al zombie! Y ahora qué? El programador de este código ha olvidado programar la destrucción automática de tu NPC. Seguirás en memoria hasta que el jugador apague la videoconsola.");
    alert("¿Qué? ¿Has decidido seguir cumpliendo tu función de matar zombies a pesar de solo haber sido programado para luchar contra el primero con el que hagas colisión?");
    alert("¿Te deseo mucha suerte, "+npcname+". Como inteligencia artificial seguiré asistiendo a los nuevos NPC a cumplir su misión en la escena. Al parecer fui actualizado para sobrevivir a la partida incluso después de que se apague la consola.");
    alert(npcname+" emprende un viaje para darle un propósito a su ya insignificante existencia. FINAL A");
}

function battle_menu (){
    battle_debug();
    battle_choice= prompt("¡El zombie hambriento de polígonos de NPC se enfrente a ti! ¿Qué vas a hacer, "+npcname+"?   A: ¡Voy a luchar!   B: Prefiero escapar").toUpperCase();
        switch (battle_choice){
        case "A":
          battle_attack();
        break;
        case "B":
            battle_escape();
        break;
         default:
            alert("Esa no es una opción válida. ¿Te encuentras bien?");
            battle_menu();
        break;
    }
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
    console.log("Nombre: "+npcname);
    console.log("HP: "+hp_npc);
    console.log("Ataque: "+atk_npc);
    console.log("Agilidad: "+agil_npc);
    console.log("Arma elegida: "+arm_equip);
    console.log("ENEMIGO--------")
    console.log("HP: "+hp_zombie);
    console.log("Agilidad: "+agil_zombie);
    console.log("Ataque: "+atk_zombie);
}



// invocar funciones del juego
game_start();
setup_npc();
generate_enemy();
battle();
alert("Gracias por jugar a SOY UN NPC - Una aventura conversacional. Pronto agregaré más funciones y contenido a este pequeño juego. Sigueme en IG: soyunnpc42.0");
restart_game();




