import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import PouchDB from 'pouchdb'; 
import WebPouchDB from 'pouchdb-browser';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public pdb; 
  public employees;

  constructor(private platform: Platform) { }

  createPouchDB() {
    if(this.platform.is('cordova')) {
      PouchDB.plugin(cordovaSqlitePlugin);
      this.pdb = new PouchDB(
        'myDB', 
        { adapter: 'cordova-sqlite' }
      );
    } else {
      var pouch = new WebPouchDB('myDB');
      // pouch.plugin(cordovaSqlitePlugin);
      this.pdb = pouch;
    }

    this.pdb.info().then(console.log.bind(console));

    
  }

  create(employee) {  
    return this.pdb.post(employee);
  }   

  update(employee) {  
    return this.pdb.put(employee);
  }   

  delete(employee) {  
    return this.pdb.delete(employee);
  }   

  async getAll() {
    // let allDocs = await this.pdb.allDocs({ include_docs: true});
    let allDocs = await this.pdb.allDocs({ include_docs: true});
    return allDocs;
  }

  read() {
    let allDocs = async () => {
      let allDocs = await this.pdb.allDocs({ include_docs: true});
      this.employees = allDocs.rows.map(row => {
        row.doc.Date = new Date(row.doc.Date);
        return row.doc;
      });
  
      return this.employees
    }

    this.pdb.changes({ live: true, since: 'now', include_docs: true})
      .on('change', ()=>{
          allDocs().then((emps)=>{

          this.employees = emps;
          });
      });

    return allDocs();
  }
  


}
