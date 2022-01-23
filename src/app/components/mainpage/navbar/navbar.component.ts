import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onLogOut() {
    this.authenticationService.logout();
    this.router.navigate(['/log-in']);
  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  isUserADM() {
    if (this.authenticationService.currentUser.role === 'ADM') {
      return true;
    }
  }

  isUserRUN() {
    if (this.authenticationService.currentUser.role === 'RUN') {
      return true;
    }
  }

  isUserGE() {
    if (this.authenticationService.currentUser.role === 'GE') {
      return true;
    }
  }
}
