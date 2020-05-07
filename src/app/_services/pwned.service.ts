import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PwnedService {

  constructor() {
    return;
  }

  static passwordIsPwnd(password: string): Promise<string | null> {
    return new Promise(async (resolve) => {
      const payload = new TextEncoder().encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-1', payload);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const digest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      const range = digest.slice(0, 5)
      const suffix = digest.slice(5);

      fetch(`https://api.pwnedpasswords.com/range/${range}`).then((res) => res.text()).then((data) => {
        const regex = new RegExp(`${suffix}`);

        data.split('\n').forEach(entry => {
          const hit = entry.split(':')[0];
          const count = entry.split(':')[1];

          if (hit.match(regex)) {
            resolve(count);
          }
        });

        resolve(null);
      });
    });
  }
}
