import { Component, inject } from '@angular/core';
import { PersonService } from './person.service';
import { CommonModule } from '@angular/common';
import { Gender, PersonSchema } from 'person-proto-lib';
import { create } from '@bufbuild/protobuf';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  personService = inject(PersonService);
  Gender = Gender;

  async ngOnInit() {
    await this.personService.fetchMessage();
  }

  async onClick() {
    await this.personService.sendMessage(create(PersonSchema, {
      id: '0',
      name: 'Jean'
    }));
  }

}
