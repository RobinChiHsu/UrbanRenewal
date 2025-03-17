# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Install

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm install

# OR using Yarn
yarn
```

## Step 2: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
cd ios && pod install && cd ..
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 4: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Set Environment

Open .env file:

```sh
# Change the value

API_HOST=API_HOST
API_GOOGLE_KEY=API_GOOGLE_KEY
IOS_CLIENT_ID=IOS_CLIENT_ID
WEB_CLIENT_ID=WEB_CLIENT_ID
```

In `ios/UrbanRenewal/Info.plist`

```sh

<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleTypeRole</key>
    <string>Editor</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>fbAPPID</string> # Change the value
      <string>GOOGLE-URLSchemes</string>  # Change the value
    </array>
  </dict>
</array>

<key>FacebookAppID</key>
<string>APPID</string> # Change the value
<key>FacebookClientToken</key>
<string>FBToken</string> # Change the value
<key>FacebookDisplayName</key>
<string>AppName</string> # Change the value

<key>GIDClientID</key>
<string>GIDClientID</string> # Change the value
<key>GIDRedirectURI</key>
<string> GIDRedirectURI</string> # Change the value
```

In `android/app/env.properties`

```sh
# Change the value
API_GOOGLE_KEY=API_GOOGLE_KEY
```

In `android/app/src/main/res/values/strings.xml`

```sh
# Change the value
<string name="facebook_app_id">APP-ID</string>
<string name="fb_login_protocol_scheme">fbAPP-ID</string>
<string name="facebook_client_token">APP-TOKEN</string>
```

## Map.tsx

```sh
# 根據API資料回傳顯示為一數字陣列，根據陣列數字判斷經緯度後重新整理為<Polygon /> 可使用之資料格式
  useEffect(() => {
    const formattedPolygons = geolocation?.result?.features?.map(feature => {
      const cordinates = feature?.geometry?.coordinates[0]?.map(cord => ({
        latitude: cord[1],
        longitude: cord[0],
      }));

      return {
        cordinates,
      };
    });

    if (formattedPolygons) {
      setPolygons(formattedPolygons);
      setPosition({
        lat: formattedPolygons?.[0]?.cordinates?.[0]?.latitude,
        lng: formattedPolygons?.[0]?.cordinates?.[0]?.longitude,
      });
    }
  }, [geolocation]);
```

```sh
# 按下搜尋以後會觸發Google 地址的API，取得回傳的經緯度資料，再透過回傳的經緯度呼叫CalcDistance API，並將回傳結果第一筆設為中心點，再一一顯示坐標點
  const handleCalcDistance = useCallback(async () => {
    const response = await getAddressApi(inputValue.trim());
    const data: LATLNG = response?.results[0]?.geometry?.location;

    const result = await calcDistancePostApi(data);
    if (result) {
      setPosition({
        lat: result?.result?.[0]?.latitude || 0,
        lng: result?.result?.[0]?.longitude || 0,
      });
      setCalcDistance(result);
    }
  }, [inputValue]);
```
