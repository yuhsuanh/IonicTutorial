import { Component, OnInit } from '@angular/core';

//New import
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { Developer } from '../../entities/developer';
import { Skill } from '../../entities/skill';
import { DbService } from '../../services/db.service';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-developer',
  templateUrl: './developer.page.html',
  styleUrls: ['./developer.page.scss'],
})
export class DeveloperPage implements OnInit {

  mainForm: FormGroup;
  developers : Developer[] = [];

  constructor(
    private db: DbService,
    private router: Router,
    private toast: ToastController,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(ready => {
      if(ready) {
        this.db.fetchDevelopers().subscribe(items => {
          this.developers = items;
        })
      }
    });

    this.mainForm = this.formBuilder.group({
      name: [''],
      // skills: [''],
      img: ['']
    })
  }

  storeData() {
    console.log('Method storeData...');
    console.log('Call add Developer...')
    console.log(this.mainForm.value.name);

    console.log(this.mainForm.value.img);
    this.db.addDeveloper(
      this.mainForm.value.name,
      // this.mainForm.value.skills,
      this.mainForm.value.img
    ).then(res => {
      console.log('Reset Form...');
      this.mainForm.reset();
    })
    console.log('Finish storeData...');
  }

  deleteData(id) {
    this.db.deleteDeveloper(id).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Developer deleted',
        duration: 2500
      })
      toast.present();
    });
  }

}
