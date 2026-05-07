# Building the RizzAI Android APK

## Prerequisites

1. **Java JDK 17+** — Android Gradle requires Java. Set `JAVA_HOME`:
   ```powershell
   $env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
   ```

2. **Android SDK** — Install via Android Studio. Ensure `ANDROID_SDK_ROOT` is set:
   ```powershell
   $env:ANDROID_SDK_ROOT = "$env:LOCALAPPDATA\Android\Sdk"
   ```

3. **Add to PATH**:
   ```powershell
   $env:PATH += ";$env:ANDROID_SDK_ROOT\platform-tools"
   ```

## Build Scripts (from project root)

| Command | What it does |
|---------|-------------|
| `npm run build:mobile` | Static export to `dist/` for Capacitor |
| `npm run sync:android` | Sync Capacitor web assets to Android project |
| `npm run build:apk` | Full debug APK build |
| `npm run build:apk:release` | Full release APK build (unsigned) |
| `npm run dev:mobile` | Build, sync, and run on connected Android device |

## Manual Build Steps

If scripts fail, run step by step:

```powershell
# 1. Set env vars
$env:CAPACITOR_BUILD = "true"
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"

# 2. Build static export
npm run build

# 3. Sync to Android
npx cap sync android

# 4. Build APK
cd android
.\gradlew assembleDebug

# Output: android\app\build\outputs\apk\debug\app-debug.apk
```

## Vercel vs Mobile Builds

- **Vercel**: Uses standard Next.js serverless (no env var needed).
- **Mobile**: Requires `CAPACITOR_BUILD=true` to trigger static export.
- `next.config.ts` handles this automatically — do not modify.
