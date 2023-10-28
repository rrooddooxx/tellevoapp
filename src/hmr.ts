import { ApplicationRef, enableProdMode, NgZone } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { createNewHosts } from '@angularclass/hmr';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

export const hmrBootstrap = (module: any, bootstrap: () => void) => {
  let applicationRef: ApplicationRef;
  module.hot.accept();
  bootstrap();
  module.hot.dispose(() => {
    const elements = applicationRef.components.map(
      (c) => c.location.nativeElement
    );
    const makeVisible = createNewHosts(elements);
    applicationRef.destroy();
    makeVisible();
  });
};

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
  bootstrapApplication(AppComponent, {
    providers: [
      // ... your providers
    ],
  }).then((app) => {
    applicationRef = app.injector.get(ApplicationRef);
    const ngZone = app.injector.get(NgZone);
    ngZone.run(() => applicationRef.tick());
  });
};

if (environment.hmr) {
  if (module['hot']) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap();
}
