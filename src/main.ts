import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

window.addEventListener('error', e => {
  alert(`App error : ${e.message
    }`)
})

window.addEventListener('unhandledrejection', e => {
  alert(`App error : ${e.reason.message ?? String(e.reason)
    }`)
})
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
