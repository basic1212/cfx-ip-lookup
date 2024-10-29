const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function afficherASCII() {
    console.clear(); 
    console.log(" \x1b[31m ██████╗███████╗██╗  ██╗   ██████╗ ███████╗");
    console.log(" ██╔════╝██╔════╝╚██╗██╔╝   ██╔══██╗██╔════╝");
    console.log(" ██║     █████╗   ╚███╔╝    ██████╔╝█████╗  ");
    console.log(" ██║     ██╔══╝   ██╔██╗    ██╔══██╗██╔══╝  ");
    console.log(" ╚██████╗██║     ██╔╝ ██╗██╗██║  ██║███████╗");
    console.log("  ╚═════╝╚═╝     ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝ ")
    console.log("         Made by basicx2x2r\x1b[0m");
}

function afficherMenu() {
    console.clear();
    afficherASCII();
    console.log("\x1b[37m[1] Lookup IP CFX");
    console.log("[0] Quitter\x1b[0m\n");
}


async function recupererIP(url) {
    try {
        const reponse = await axios.get(url);

        if (!reponse.headers["x-citizenfx-url"]) {
            throw new Error("Erreur : Impossible de récupérer l'adresse IP.");
        }
        return reponse.headers["x-citizenfx-url"].replace("http://", "").replace("/", "");
    } catch (error) {
        throw new Error("Erreur : Serveur introuvable ou hors ligne.");
    }
}

function estIPValide(ip) {
    const regex = /^(25[0-5]|(2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){3}(25[0-5]|(2[0-4][0-9]|[01]?[0-9][0-9]?))$/;
    return regex.test(ip);
}

async function rechercherIP() {
    rl.question("\x1b[37mEntrez l'adresse cfx.re : \x1b[0m", async (input) => {
        let url;

        if (input.startsWith("cfx.re/join/")) {
            url = "https://" + input;
        } else if (input.startsWith("https://")) {
            url = input;
        } else {
            url = "https://cfx.re/join/" + input;
        }

        try {
            const ip = await recupererIP(url);
            console.log(`\n\x1b[32mAdresse CFX.re : \x1b[37m${url}\x1b[0m`);
            console.log(`\x1b[32mAdresse IP résolue : \x1b[37m${ip}\x1b[0m\n`);
        } catch (error) {
            console.log(`\x1b[31m${error.message}\x1b[0m`);
        }

        rl.question("\nAppuyez sur Entrée pour revenir au menu...", () => {
            afficherMenu();
            selectionnerOption();
        });
    });
}

function selectionnerOption() {
    rl.question("\x1b[37mSélectionnez une option : \x1b[0m", (option) => {
        switch (option) {
            case '1':
                rechercherIP();
                break;
            case '0':
                rl.close();
                break;
            default:
                console.log("\x1b[31mErreur : Option non valide. Veuillez sélectionner une option valide.\x1b[0m");
                afficherMenu();
                selectionnerOption();
                break;
        }
    });
}

afficherMenu();
selectionnerOption();
