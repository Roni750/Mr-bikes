import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'
import { User } from 'src/app/models/user.model'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent {

  user!: User
  loggedIn!: boolean

  constructor(
    private userService: UserService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getEmptyUser()
    this.updateLoggedInStatus()
  }

  updateLoggedInStatus() {
    this.loggedIn = !!this.userService.getUser()
    this.cd.markForCheck()
  }

  onLogout() {
    this.userService.logout()
    this.updateLoggedInStatus()
    this.router.navigateByUrl('/')
  }
}
