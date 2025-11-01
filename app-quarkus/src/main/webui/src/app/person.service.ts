import { Injectable, signal } from '@angular/core';
import { fromBinary, toBinary } from '@bufbuild/protobuf';
import { Person, PersonSchema } from 'person-proto-lib';

@Injectable({ providedIn: 'root' })
export class PersonService {
  private apiUrl = 'http://localhost:8080/person';
  
  person = signal<Person | null>(null);
  loading = signal(false);

  async fetchMessage(): Promise<void> {
    this.loading.set(true);

    try {
        const response = await fetch(this.apiUrl, {
            method: 'GET',
            headers: { 'Accept': 'application/x-protobuf' }
        });
        
        if (!response.ok) throw new Error(`HTTP error : ${response.status}`);

        const buffer = await response.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const person = fromBinary(PersonSchema, bytes);
        this.person.set(person)
    } catch (err: any) {
        console.error(err);
    } finally {
        this.loading.set(false);
    }
  }

  async sendMessage(person: Person) {
    await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-protobuf' },
        body: toBinary(PersonSchema, person)
    });
  }
}