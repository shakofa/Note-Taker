const util = require('util');  //supports the internal api
const fs = require('fs');  //for reading and writing the file

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


const uuidv1 = require('uuid'); // generate the unique id

//the data structure
class store {

    read(){
        return readFile('db/db.json', 'utf8');
    }

    write(note) {
        return writeFile('db/db.json', JSON.stringify(note));
    }



    getNotes() {
        //first read the file then write it
        return this.read().then((notes) => {
            let parsedNote;

            try{
                //concat method combine 2 arrays and return a new array.
                parsedNote= [].concat(JSON.parse(notes));
            } catch (err) {     
                //if no array exist with data send back the empty array
                parsedNote = [];
            }

            return parsedNote;
        });
    }



    addNote(note) {
        const {title, text} = note;

        if(!title || !text) {
             throw new Error("Please fill the title and text");
        }

        //add id to new note with this package
        const newNote = { title, text, id: uuidv1 };
        
        return this.getNotes()
        .then((note) => [...note, ])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);

    }



    deleteNote(id) {
        return this.getNotes()
        .then((notes) => notes.filter((note) => note.id  !== id))
        .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new store();