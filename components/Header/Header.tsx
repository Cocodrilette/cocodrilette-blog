import Navigation from '../Nav/Navigation';
import ThemeSwitch from '../Buttons/ThemeSwitch';
import { ConnectKitButton } from 'connectkit';

import styles from './Header.module.css';

export default function Header() {
  return (
    <header>
      <div className="max-w-5xl px-8 mx-auto">
        <div id={styles.navContainer} className="border-b">
          <Navigation />
          <div className="flex gap-10 flex-wrap">
            <ConnectKitButton />
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </header>
  );
}
