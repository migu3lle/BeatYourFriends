import { Inject, Injectable, InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => sessionStorage // do localStorage for persistent savings
});

@Injectable({
  providedIn: 'root'
})
 /**
  * Class BrowserStorageService, containing classic localStorage methods get, set, remove and clear
  * @aram key - key value from local storage
  * @param value - value from local storage
  * @author Christina Senger
  */  
export class BrowserStorageService {
  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}

  get(key: string) {
    return this.storage.getItem(key);
  }

  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}
