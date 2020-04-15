import { Injectable } from '@angular/core';

//New import
import { Skill } from '../entities/skill';

import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private database: SQLiteObject;
  skillList = new BehaviorSubject([]);
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
    this.httpClient.get('assets/dumpSkill.sql', {responseType: 'text'}).subscribe( sql => {
      this.sqlPorter.importSqlToDb(this.database, sql).then(_ => {
        //TODO load developer
        this.isDbReady.next(true);
      })
      .catch(e => console.log(e))
    });
  }

  getDatabaseState() {
    return this.isDbReady.asObservable();
  }

  fetchSkill() {
    return this.isDbReady.asObservable();
  }


  // Skill CRUD
  //Get skill list
  getSkills() {
    return this.database.executeSql('SELECT * FROM skill', []).then(data => {
      let items: Skill[] = [];
      if(data.rows.length > 0) {
        for(var i=0; i<data.rows.length; i++) {
          items.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            creatorId: data.rows.item(i).creatorId
          });
        }
      }
      this.skillList.next(items);
    });
  }

  //Get skill by id
  getSkill(id): Promise<Skill> {
    return this.database.executeSql('SELECT * FROM skill WHERE id = ?', [id]).then(data =>{
      return {
        id: data.rows.item(0).id,
        name: data.rows.item(0).name,
        creatorId: data.rows.item(0).creatorId
      }
    });
  }

  //Add skill
  addSkill(name, creatorId) {
    let data = [name, creatorId];
    return this.database.executeSql('INSERT INTO skill (name, creatorId) VALUES (?, ?)', data).then(data => {
      this.getSkills();
    });
  }

  //Update skill
  updateSkill(skill: Skill) {
    let data = [skill.name, skill.creatorId];
    return this.database.executeSql(`UPDATE skill SET name = ?, creatorId = ? WHERE id = ${skill.id}`, data).then(data => {
      this.getSkills();
    })
  }

  //Delete skill
  deleteSkill(id) {
    return this.database.executeSql('DELETE FROM skill WHERE id = ?', [id]).then(_ => {
      this.getSkills();
    })
  }

}
