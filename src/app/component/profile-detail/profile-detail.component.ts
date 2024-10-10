import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService, ProfileService } from '../../services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.scss',
})
export class ProfileDetailComponent {
  @ViewChild('scrollContainer')
  scrollContainer!: ElementRef;
  profiles: any[] = [];
  selectedProfile: any = null;
  selectedProfileIndex: any;
  index: any;
  currentImageIndex = 0;
  title: string = 'Profile Detail';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private headerService: HeaderService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    this.title = this.headerService.getHeader();
    await this.profileService
      .getProfileData()
      .then((data) => {
        this.profiles = data;
        this.index = this.route.snapshot.paramMap.get('index');
        this.selectProfile(this.index);
      })
      .catch((error) => {
        console.error('Error loading profile datas:', error);
      });
  }

  async selectProfile(index: any): Promise<void> {
    this.selectedProfileIndex = index;
    this.selectedProfile = await this.profiles[index];
  }

  goToHomepage() {
    this.router.navigate(['']);
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }

  prevImage(): void {
    this.currentImageIndex =
      this.currentImageIndex > 0
        ? this.currentImageIndex - 1
        : this.selectedProfile?.photosCollection?.length - 1;
  }

  nextImage(): void {
    this.currentImageIndex =
      this.currentImageIndex < this.selectedProfile?.photosCollection?.length - 1
        ? this.currentImageIndex + 1
        : 0;
  }

  goToImage(index: number): void {
    this.currentImageIndex = index;
  }

  async shortlisted() {
    await this.showToast('Shortlisted');
    this.swipeToNextProfile(this.selectedProfileIndex);
  }
  async notIntrested() {
    await this.showToast('Not Intrested');
    this.swipeToNextProfile(this.selectedProfileIndex);
  }
  async intrested() {
    await this.showToast('Intrested');
    this.swipeToNextProfile(this.selectedProfileIndex);
  }

  async showToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      panelClass: ['my-snackbar'],
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }

  async swipeToNextProfile(index: any) {
    index < this.profiles.length - 1
      ? this.selectProfile(index + 1)
      : this.selectProfile(0);
  }
}
