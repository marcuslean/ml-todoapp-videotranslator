import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  constructor(private router: Router) { }

  // on load page redirect user to todo page after 3 seconds
  ngOnInit() {
    setTimeout(() => { this.router.navigateByUrl('/todo') }, 3000)
  }
}
