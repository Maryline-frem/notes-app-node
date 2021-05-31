const yargs = require('yargs');
const fs = require("fs");

yargs.command({
    command: 'list',
    describe: 'Liste toutes mes notes',
    handler: () => {
        console.log("Voici la liste des notes");

        fs.readFile("data.json", "utf-8", (err,data) => {
            if(err) console.log(err);
            else {
                const notes = JSON.parse(data);

                // Boucle for classique
                // for(let i=0; i<notes.length;i++) {
                //     console.log(`${notes[i].id}. ${notes[i].title}`);
                // }

                // foreach
                notes.forEach(note => {
                    console.log(`${note.id}. ${note.title}`);
                })
            }
        })
    }
}).command({
    command: 'add',
    describe: "Ajoute une note",
    builder: {
        title: {
            describe: "Titre de ma note",
            demandOption: true,
            type: "string"
        },
        message: {
            describe: "Message de ma note",
            demandOption: false,
            type: "string"
        }
    },
    handler: (argv) => {
        // Pour modifier le contenu d'un fichier
        // 1. le récupérer
        fs.readFile("data.json", "utf-8", (err,dataStr) => {
            // 1a. Grâce à utf-8, le contenu du fichier
            // est en  en chaîne de caractère
            console.log(dataStr)

            // 1b. Je transforme la string JSON en valeur JS
            const notes = JSON.parse(dataStr)
            console.log(notes);
    
            // 2. Exécuter les modifications en JS

            const newNote = {
                title: argv.title,
                message: argv.message
            }

            notes.push(newNote);
            console.log(notes);
    
            // 2b. Transformer mes modifs valeurs JS en chaine JSON
            const notesJSON = JSON.stringify(notes);
            console.log(notesJSON);

            // 3. Envoyer les modifs de mon JSON en écrasant le fichier
            fs.writeFile("data.json",notesJSON,(err) => {
                if(err) console.log(err);
                else {
                    console.log("La note a été ajoutée");
                }
            });
        })
    }
}).command({
    command: 'remove',
    describe: "Supprime une note",
    builder: {
        title: {
          describe: 'Supprime une note',
          demandOption: true,
          type: 'string'
        }
      },
      handler: (argv) => {
        notes.removeNote("Chaud pour ajouter une note")
        
        fs.readFile("data.json", "utf-8", (err,data) => {
            console.log(data)

            const notes = JSON.parse(data)
            console.log(notes);
    
            const deleteNote = {
                title: argv.title,
                message: argv.message
            }

            notes.push(deleteNote);
            console.log(notes);
    
            const notesJSON = JSON.stringify(notes);
            console.log(notesJSON);

            fs.writeFile("data.json",notesJSON,(err) => {
                if(err) console.log(err);
                else {
                    console.log("La note a été supprimée");
                }
            });
        })
      }
}).command({
    command: 'read',
    describe: "Affiche le détail d'une note",
    builder: {
        note: {
            describe: "Ma note",
            demandOption: true,
            type: "string"
        }
    },
    handler: () => {
        console.log("Voici le détail d'une note");
        fs.readFile("data.json", "utf-8", (err,data) => {
            if(err) console.log(err);
            else {
                const note = JSON.parse(data);

                console.log(`Titre : ${note.title} Message : ${note.message}`);
            }
        })
    }
}).argv;