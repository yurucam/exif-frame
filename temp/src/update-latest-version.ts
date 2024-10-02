import semver from 'semver';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { version as currentVersion } from '../package.json';

async function updateLatestVersion(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  try {
    const { version: publishedVersion, url } = await fetch('https://exif-frame.yuru.cam/version.json').then((res) => res.json());

    // Update when the latest version is greater than the current version.
    if (semver.gt(publishedVersion, currentVersion)) {
      const bundle = await CapacitorUpdater.download({ url, version: publishedVersion });
      await CapacitorUpdater.set(bundle);
    } else {
      // Hide splash screen when the latest version is not greater than the current version.
      await SplashScreen.hide();
    }
  } catch (e) {
    // Do nothing when failed to update.
    await SplashScreen.hide();
  }

  CapacitorUpdater.notifyAppReady();
}

updateLatestVersion();
