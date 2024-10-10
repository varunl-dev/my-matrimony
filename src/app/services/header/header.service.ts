import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private currentHeader: string = '';

  setHeader(header: string) {
    this.currentHeader = header;
  }

  getHeader(): string {
    return this.currentHeader;
  }
}
