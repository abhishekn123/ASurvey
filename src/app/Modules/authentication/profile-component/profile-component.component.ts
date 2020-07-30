import { Component, OnInit ,Input} from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.component.html',
  styleUrls: ['./profile-component.component.css']
})
export class ProfileComponentComponent implements OnInit {

  @Input() url:string
  @Input() Email:string
  constructor(private authService: SocialAuthService) { }

  ngOnInit(): void {
  }
  logout():void
  {
   this.authService.signOut().catch((err)=>
   {
     console.log(err)
   })
  }

}
