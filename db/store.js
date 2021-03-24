const util = require('util');  //supports the internal api
const fs = require('fs');  //for reading and writing the file

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


const uuid = require('uuid/v1'); // generate the unique

//the data structure
class store {

    read(){
        return readFile('db/db.json', 'utf8');
    }

    write(note) {
        return writeFile('db/db.json', JSON.stringify(note));
    }



    getNote() {
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
        const {title, description} = note;

        if(!title || !description) {
             throw new Error("Please fill the title and description");
        }

        //add id to new note with this package
        const newNote = {title, description,id: uuidv1() };
        
        
        return this.getNote().then((note) => [...note, ]).then =((updatedNote) => this.write(updatedNote)).then(() => newNote);

    }



    deleteNote() {
        return this.getNote().then((note) => note.filter((note) => note.id  !== id).then((filteredNote) => this.write(filteredNote));
    }
}

module.exports = new store();