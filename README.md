# Authentication Frontend

A **React Native** delivery mobile app

## Run in dev

- npm run start

## Troubleshooting

CommandError: No development build (com.fredaguiar.authenticatorfrontend) for this project is installed. Please make and install a development build on the device first

Solution:

- Android Studio / Virtual Device Manager / Wipe data / cold boot
- npm run adroid

---

"RNCAndroidDialogPicker" was not found in the UIManager

Solution:

- Android Studio / Virtual Device Manager / Wipe data / cold boot
- npm run android

---

ApolloError: Network request failed
The localhost IP has changed.

Solution Update the IP .env file: EXPO_PUBLIC_APOLLO_SERVER_URI=http://{IP}:4000/graphql
