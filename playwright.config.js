// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
//export default defineConfig //вместо этого поставили снизу конст. 
const config = ({  // короче мы убираем экпорт дефолт дефаниконф, а вместо этого ставим конст 
  testDir: './tests',
  timeout: 30*1000, // this timeout which is applicable to every step
  expect:{
    timeout: 5000, //this timeout exclusively for assertion validations
  },
  reporter: 'html', // если мы хотим маленький рипортер, то можем добавить в таком ввиде. 
  
  use: {
    
    browserName: 'chromium', //на данный момент, какой браузер мы хотим. нам объясняет в конфигурации с нуля. о том, какие файлы тут есть. что мы тут в ручную делаем.
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless: false, //если мы пишем тут headless: true/false, то в терминале можно не вызывать --headed. а просто npx playwright test уже будет работать headed mode 
    screenshot: 'only-on-failure', //off /on
    trace: 'oretain-on-failure'// off /on
  },

  });
module.exports = config //And finally what you can do is you can export module dot exports equals to export this variable so that

//it is available across all the files in your project
