import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderService, ProfileService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  @ViewChild('scrollDailyMatchContainer')
  scrollDailyMatchContainer!: ElementRef;
  @ViewChild('scrollRecommendationContainer')
  scrollRecommendationContainer!: ElementRef;
  profiles: any[] = [];

  constructor(
    private profileService: ProfileService,
    private headerService: HeaderService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.profileService
      .getProfileData()
      .then((data) => {
        this.profiles = data;
      })
      .catch((error) => {
        console.error('Error loading profile datas:', error);
      });
  }

  scrollDailyMatchLeft() {
    this.scrollDailyMatchContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  scrollDailyMatchRight() {
    this.scrollDailyMatchContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }

  scrollRecommendationLeft() {
    this.scrollRecommendationContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  scrollRecommendationRight() {
    this.scrollRecommendationContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }

  async goToProfileDetail(index: number, header: string): Promise<void> {
    this.headerService.setHeader(header);
    this.router.navigate(['/profile-detail', index]);
  }
}
