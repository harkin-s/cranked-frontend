import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
document.write('<script src="https://js.stripe.com/v3/"></script>');



platformBrowserDynamic().bootstrapModule(AppModule);
