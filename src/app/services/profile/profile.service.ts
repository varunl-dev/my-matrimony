import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profileDataPath = 'assets/profile-data.json';
  profiles: any[] = [];

  constructor() {}

  async getProfileData(): Promise<any> {
    try {
      const response = await fetch(this.profileDataPath);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.profiles = data;
      return this.profiles;
    } catch (error) {
      console.error('Error fetching profile datas:', error);
    }
  }
}
