import { Injectable } from '@angular/core';

//New import
import { Developer } from '../entities/developer';

import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';


@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  private database: SQLiteObject;
  developerList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(    
      private platform: Platform, 
      private sqlite: SQLite, 
      private httpClient: HttpClient,
      private sqlPorter: SQLitePorter,
  ) {
      this.platform.ready().then(() => {
        this.sqlite.create({
          name: 'sample.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          this.database = db;
          this.getMockData();
        });
      });
    }

  getMockData() {
    this.httpClient.get('assets/dumpDeveloper.sql', {responseType: 'text'}).subscribe( sql => {
      this.sqlPorter.importSqlToDb(this.database, sql).then(_ => {
        this.getDevelopers();
        this.isDbReady.next(true);
      })
      .catch(e => console.log(e))
    });
  }

  getDatabaseState() {
    return this.isDbReady.asObservable();
  }

  fetchDeveloper() {
    return this.isDbReady.asObservable();
  }

  // Developer CRUD
  //Get developer list
  getDevelopers() {
    return this.database.executeSql('SELECT * FROM developer', []).then(data => {
      let items: Developer[] = [];
      if(data.rows.length > 0) {
        for(var i=0; i<data.rows.length; i++) {
          let skills = [];
          if (data.rows.item(i).skills != '') {
            skills = JSON.parse(data.rows.item(i).skills);
          }

          items.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            skills: skills,
            img: data.rows.item(i).img
          });
        }
      }
      this.developerList.next(items);
    });
  }

  //Get developer by id
  getDeveloper(id): Promise<Developer> {
    return this.database.executeSql('SELECT * FROM developer WHERE id = ?', [id]).then(data =>{
      let skills = [];
      if (data.rows.item(0).skills != '') {
        skills = JSON.parse(data.rows.item(0).skills);
      }

      return {
        id: data.rows.item(0).id,
        name: data.rows.item(0).name,
        skills: skills,
        img: data.rows.item(0).img
      }
    });
  }

  //Add developer
  addDeveloper(name, skills, img) {
    let data = [name, JSON.stringify(skills), img];
    return this.database.executeSql('INSERT INTO developer (name, skills, img) VALUES (?, ?, ?)', data).then(data => {
      this.getDevelopers();
    });
  }

  //Update developer
  updateDeveloper(dev: Developer) {
    let data = [dev.name, JSON.stringify(dev.skills), dev.img];
    return this.database.executeSql(`UPDATE developer SET name = ?, skills = ?, img = ? WHERE id = ${dev.id}`, data).then(data => {
      this.getDevelopers();
    })
  }

  //Delete developer
  deleteDeveloper(id) {
    return this.database.executeSql('DELETE FROM developer WHERE id = ?', [id]).then(_ => {
      this.getDevelopers();
    })
  }
  
}