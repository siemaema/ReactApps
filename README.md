README for Projekt Sklepu
🛒 Projekt Sklepu
Projekt Sklepu to pełnoprawna aplikacja e-commerce stworzona przy użyciu React, Node.js i Express.
Składa się z frontendu, backendu oraz bazy danych, umożliwiając użytkownikom przeglądanie produktów,
składanie zamówień i zarządzanie kontem.

📌 Kluczowe funkcjonalności
✅ Autoryzacja i rejestracja użytkowników
✅ Przeglądanie i wyszukiwanie produktów
✅ Koszyk zakupowy i finalizacja zamówienia
✅ Panel administracyjny do zarządzania produktami
✅ Responsywny interfejs użytkownika
✅ Backend z API REST

📂 Struktura projektu
Projekt składa się z dwóch głównych części: backendu (serwera API) oraz frontendu (interfejsu użytkownika).

W folderze BackEnd znajduje się serwer napisany w Node.js z frameworkiem Express. Obsługuje on autoryzację użytkowników oraz zarządzanie produktami.

Frontend, znajdujący się w głównym katalogu projektu, został zbudowany w React z wykorzystaniem Vite jako narzędzia do zarządzania środowiskiem deweloperskim.



🚀 Instalacja i uruchomienie

🔧 Wymagania:
Node.js
MongoDB

💻 Uruchomienie projektu lokalnie

1️⃣ Klonowanie repozytorium:

git clone https://github.com/siemaema/ReactApps.git

cd ReactApps/Projekt Sklepu

2️⃣ Instalacja zależności:
npm install

3️⃣ Konfiguracja zmiennych środowiskowych:
Utwórz plik .env w folderze BackEnd/ i dodaj:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4️⃣ Uruchomienie backendu:
cd BackEnd
node server.mjs

5️⃣ Uruchomienie frontendu:
cd Projekt Sklepu
npm run dev (uruchamia się na porcie 5173)

📜 Opis kluczowych plików
🔹 Backend
server.mjs – Główny plik serwera

routes/products.js – Endpointy API dla produktów

routes/user.js – Endpointy API dla użytkowników

models/products.js – Model bazy danych dla produktów

models/user.js – Model użytkownika

🔹 Frontend

Screens/MainPage.jsx – Strona główna sklepu

Screens/Cart.jsx – Koszyk użytkownika

Screens/Product.jsx – Strona pojedynczego produktu

Screens/LoginPage.jsx – Logowanie i rejestracja

Components/NavBar.jsx – Nawigacja aplikacji

Components/ProductsList.jsx – Lista produktów

Components/Slider.jsx – Slider promocyjny



🚀 Technologie
Frontend: React, Tailwind CSS, Context API
Backend: Node.js, Express.js, MongoDB, JWT
Narzędzia: Vite, ESLint

🤝 Chcesz dodać nową funkcjonalność? Zapraszamy do forka repozytorium i składania pull requestów.

git checkout -b feature-new-functionality
git commit -m "Dodano nową funkcjonalność"
git push origin feature-new-functionality
