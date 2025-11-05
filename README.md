# 📱 TaskCraft Mobile

**TaskCraft Mobile** is a powerful and intuitive **task management app** built with **React Native**.  
It helps teams and individuals organize, track, and complete tasks efficiently — anytime, anywhere.

---

## 🚀 Features

- 🧭 **Intuitive UI** — clean and responsive mobile experience
- 🔄 **Sync with TaskCraft Web** — stay updated across platforms
- 📶 **Offline support** — work seamlessly without internet
- 👥 **Collaboration tools** — manage teams and shared boards
- ⚡ **Fast performance** — built with React Native and TypeScript

---

## 🛠️ Tech Stack

- **React Native**
- **TypeScript**
- **React Navigation**
- **Yup / React Hook Form** (for validation)
- **Axios** (for API communication)
- **TanStack Query** (for data fetching and caching)

---

## 🧩 Project Structure

```sh
src/
├── api/ # API calls
├── app/ # Screens and navigation
├── components/ # Reusable UI components
├── config/ # App configuration
├── hooks/ # Custom hooks
├── styles/ # Global styles & theme
├── types/ # TypeScript types
├── validation/ # Validation schemas
└── queryClient.ts # React Query client
```

---

````
## ⚙️ Installation & Setup

## Step 1: Clone the repository

```sh
git clone https://github.com/Cassel444/TaskCraftMobile.git
cd TaskCraftMobile
````

## Step 2: Install dependencies

```sh
npm install
# or
yarn install
```

## Step 3: Start the Metro bundler

```sh
npx react-native start
```

## Step 4: Run the app on Android

```sh
npx react-native run-android
```

💡 Make sure your Android emulator is running, or a physical device is connected.

---

## 🧠 Development Notes

- Requires Android Studio with SDK and AVD configured

- Ensure **local.properties** file contains your SDK path:

```sh
sdk.dir=C:\\Users\\<YourUser>\\AppData\\Local\\Android\\Sdk
```

✨ TaskCraft Mobile — productivity in your pocket. ✨
