import { AlertManagerService } from './../../../Helpers/alert-manager.service';
import { AuthenticationService } from './../AuthService/authentication.service';
import { Component, OnInit ,Input} from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.component.html',
  styleUrls: ['./profile-component.component.css']
})
export class ProfileComponentComponent implements OnInit {

  @Input() url:string
  @Input() Email:string
  constructor(private route:Router,private authService: SocialAuthService,public Auth:AuthenticationService,private Alert:AlertManagerService) { }
  ngOnInit(): void {
        
  }
  logout():void
  {
    this.authService.signOut();
    this.route.navigate(['/Login'])
    localStorage.removeItem('Token');
    this.Alert.openSnackBar('SignedOut Successfully','Done');
    this.Auth.User=null;
    console.log('logout state',this.authService.authState)
  }

}
