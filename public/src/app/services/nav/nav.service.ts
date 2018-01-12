import { Injectable } from '@angular/core';

@Injectable()
export class NavService {

  constructor() { }

  extend(a, b) {
    for(var key in b) { 
      if(b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  navAction(action) {

    let navMenuType = 'push-right';
    

    /********************** DO NOT EDIT BELOW THIS ***********************/



    

    if (action === "open nav") {
      document.body.classList.add('has-active-menu');
      document.getElementById('content-wrapper').classList.add('has-' + navMenuType);
      document.getElementById('nav-menu-' + navMenuType).classList.add('is-active');
      document.getElementById('nav-mask').classList.add('is-active');
    }

    if (action === 'close nav') {
      document.body.classList.remove('has-active-menu');
      document.getElementById('content-wrapper').classList.remove('has-' + navMenuType);
      document.getElementById('nav-menu-' + navMenuType).classList.remove('is-active');
      document.getElementById('nav-mask').classList.remove('is-active');
    }

  }
}
