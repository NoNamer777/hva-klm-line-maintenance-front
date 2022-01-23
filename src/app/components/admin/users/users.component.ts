import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {User} from '../../../models/user';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UserDetailsComponent} from '../user-details/user-details.component';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private users: User[];

  constructor(private usersService: UsersService, private dialog: MatDialog,
              private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe(users => this.users = users);
  }

  onViewUser(selectedUser: User) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = selectedUser;
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '60%';

    this.dialog.open(UserDetailsComponent, dialogConfig);
  }
}
